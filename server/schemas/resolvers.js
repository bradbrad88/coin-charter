const { Charts, Coins, Comments, Users, FavCoin } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken, setCookie } = require("../utils/auth");

// TODO add in sorting filters

// ? can make into seperate folders

// https://www.mongodb.com/community/forums/t/graphql-and-mongoose-relationship/106136
// * info about the relationships for resolvers

const resolvers = {
  Query: {
    users: async () => {
      // ? not sure if populate with Users again because of self-reference
      const users = await Users.find({})
        .populate("comments")
        .populate({ path: "favCoins", populate: "coin" });
      return users;
    },
    user: async (parent, args) => {
      const user = await Users.findById(args.id)
        .populate("comments")
        .populate({ path: "favCoins", populate: "coin" });
      return user;
    },
    comments: async () => {
      return await Comments.find({})
        .populate("users")
        .populate({ path: "users", populate: "comments" });
    },
    comment: async (parent, args) => {
      return await Comments.findById(args.id)
        .populate("users")
        .populate({ path: "users", populate: "comments" });
    },
    coins: async (parent, args) => {
      return await Coins.findById(args.id)
        .populate("comments")
        .populate({ path: "comments", populate: "users" })
        .populate("charts")
        .populate({ path: "charts", populate: "comments" });
    },
    charts: async () => {
      return await Charts.find({})
        .populate("comments")
        .populate({ path: "comments", populate: "users" });
    },
    chart: async (parent, args) => {
      return await Charts.findById(args.id)
        .populate("comments")
        .populate({ path: "comments", populate: "users" });
    },
    searchUsers: async (parent, { query }) => {
      const regex = new RegExp(`.*${query}.*`, "i");
      const users = await Users.find({ username: regex })
        .populate("comments")
        .populate({ path: "comments", populate: "users" });

      return users;
    },
    friendRequests: async (parent, args, { user }) => {
      if (!user) throw new AuthenticationError();
      const requests = await Users.findById(user).populate({
        path: "receivedFriendRequests",
        populate: "user",
      });
      return requests.receivedFriendRequests;
    },
    friends: async (parent, args, { user: userId }) => {
      if (!userId) throw new AuthenticationError();

      const user = await Users.findById(userId)
        .populate("charts")
        .populate("comments")
        .populate({ path: "friends", populate: "friend" });
      return user.friends;
    },
    recentActivity: async (parent, args, { user: userId }) => {
      if (!userId) throw new AuthenticationError();

      const user = await Users.findById(userId)
        .populate({
          path: "friends",
          populate: {
            path: "friend",
            populate: { path: "favCoins", populate: "coin" },
          },
        })
        .populate("charts")
        .populate({ path: "favCoins", populate: "coin" });

      const operations = [
        (user) => {
          console.log(user);
          return user.favCoins.map((favCoin) => ({
            createdAt: favCoin.updatedAt,
            text: "liked a new coin:",
            value: favCoin.coin.coinName,
            path: `coins/${favCoin.coinId}`,
          }));
        },
        (user) => {
          return user.charts.map((chart) => ({
            createdAt: chart.updatedAt,
            text: "created a new chart for ",
            value: chart.coin,
            path: `charts/${chart._id}`,
          }));
        },
      ];

      const activities = user.friends.flatMap(({ friend }) => {
        const parseOperations = (operations) => {
          return operations.flatMap((fn) =>
            fn(friend).map((item) => ({
              ...item,
              username: friend.username,
              image: friend.image,
            })),
          );
        };
        const activities = parseOperations(operations);
        return activities;
      });
      return activities;
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }, { res }) => {
      const user = await Users.create({ username, email, password });
      const token = signToken(user);
      setCookie(res, token);
      return user.populate({ path: "favCoins", populate: "coin" });
    },
    loginUser: async (parent, { username, password }, { res }) => {
      const user = await Users.findOne({ username });
      if (!user) throw new AuthenticationError();
      if (!(await user.isCorrectPassword(password)))
        throw new AuthenticationError();
      const token = signToken(user);
      setCookie(res, token);
      return user.populate({ path: "favCoins", populate: "coin" });
    },
    logoutUser: async (parent, args, { res, user }) => {
      if (!user) {
        return false;
      }
      res.clearCookie("token");
      return true;
    },
    addImage: async (parent, { image }, { user }) => {
      await Users.findByIdAndUpdate(
        user._id,
        { $set: { image } },
        { new: true },
      );
      return image;
    },
    addBio: async (parent, { bio }, { user }) => {
      if (!user) throw new AuthenticationError();
      await Users.findByIdAndUpdate(user._id, { $set: { bio } }, { new: true });
      return bio;
    },
    addCoin: async (parent, { coinId, coinName, symbol, image }, { user }) => {
      if (!user) throw new AuthenticationError();
      const coin = await Coins.findOneAndUpdate(
        { coinId },
        { $set: { coinId, coinName, symbol, image } },
        { new: true, upsert: true },
      );
      const updatedUser = await Users.findByIdAndUpdate(
        user,
        { $push: { favCoins: { $each: [{ coin: coin._id }], $position: 0 } } },
        { new: true, timestamps: true },
      ).populate({ path: "favCoins", populate: "coin" });
      return updatedUser;
    },
    removeCoin: async (parent, { coinId }, { user }) => {
      if (!user) throw new AuthenticationError();
      const coin = await Coins.findOne({ coinId });
      const updatedUser = await Users.findByIdAndUpdate(
        user,
        { $pull: { favCoins: { coin: coin._id } } },
        { new: true },
      ).populate({ path: "favCoins", populate: "coin" });
      return updatedUser;
    },

    addChart: async (
      parent,
      {
        coinId,
        coinName,
        symbol,
        chartTitle,
        chartDescription,
        imageThumbnail,
        imageMedium,
        imageSmall,
      },
      { user },
    ) => {
      if (!user) throw new AuthenticationError();

      const newCoin = await Coins.findOne({ coinId: coinId });
      if (!newCoin) {
        await Coins.create({ coinName, coinId, symbol });
      }

      const newChart = await Charts.create({
        coinId,
        coinName,
        symbol,
        chartTitle,
        chartDescription,
        username: user._id,
        imageThumbnail,
        imageMedium,
        imageSmall,
      });

      await Coins.findOneAndUpdate(
        { coinId },
        { $push: { coinCharts: newChart._id } },
        { new: true },
      );

      const addToUser = await Users.findByIdAndUpdate(
        user,
        {
          $push: { charts: newChart._id },
        },
        { new: true },
      );

      return addToUser;
    },
    sendFriendRequest: async (parent, args, { user }) => {
      if (!user) throw new AuthenticationError();
      const request = { ...args };
      delete request.friendId;
      await Users.findByIdAndUpdate(
        args.friendId,
        {
          $addToSet: { receivedFriendRequests: request },
        },
        { new: true },
      );
      return true;
    },
    acceptFriendRequest: async (parent, { friendId }, { user: userId }) => {
      if (!userId) throw new AuthenticationError();

      const user = await Users.findById(userId);

      const valid = await user.isValidRequest(friendId);

      if (!valid) throw new Error("nope");

      await user.updateOne({
        $pull: {
          receivedFriendRequests: { userId: friendId },
        },
      });

      const friend = await Users.findById(friendId);
      if (!friend) throw new Error("they don't exist");

      const updatedUser = user.updateOne(
        { $addToSet: { friends: { friend: friendId } } },
        { new: true, timestamps: true },
      );

      await friend.updateOne({ $addToSet: { friends: user._id } });
      return updatedUser;
    },
    declineFriendRequest: async (parent, { friendId }, { user: userId }) => {
      if (!userId) throw new AuthenticationError();

      await Users.findByIdAndUpdate(userId, {
        $pull: { receivedFriendRequests: { userId: friendId } },
      });

      return true;
    },
  },
};

module.exports = resolvers;
