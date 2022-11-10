const { Charts, Coins, Comments, Users } = require("../models");
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
        .populate("favCoins");
      return users;
    },
    user: async (parent, args) => {
      const user = await Users.findById(args.id)
        .populate("comments")
        .populate("favCoins");
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
  },
  Mutation: {
    addUser: async (parent, { username, email, password }, { res }) => {
      const user = await Users.create({ username, email, password });
      const token = signToken(user);
      setCookie(res, token);
      return user.populate("favCoins");
    },
    loginUser: async (parent, { username, password }, { res }) => {
      const user = await Users.findOne({ username });
      if (!user) throw new AuthenticationError();
      if (!(await user.isCorrectPassword(password)))
        throw new AuthenticationError();
      const token = signToken(user);
      setCookie(res, token);
      return user.populate("favCoins");
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
    addFriend: async (parent, { friendId }, { user }) => {
      if (!user) throw new AuthenticationError();
      const friend = await Users.findById(friendId);
      if (!friend) throw new AuthenticationError();
      const updatedUser = await Users.findByIdAndUpdate(
        user._id,
        { $addToSet: { friends: friendId } },
        { new: true },
      );
      await Users.findByIdAndUpdate(
        friendId,
        { $addToSet: { friends: user._id } },
        { new: true },
      );
      return updatedUser;
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
        { $push: { favCoins: { $each: [coin._id], $position: 0 } } },
        { new: true },
      ).populate("favCoins");
      return updatedUser;
    },
    removeCoin: async (parent, { coinId }, { user }) => {
      if (!user) throw new AuthenticationError();
      const coin = await Coins.findOne({ coinId });
      const updatedUser = await Users.findByIdAndUpdate(
        user,
        { $pull: { favCoins: coin._id } },
        { new: true },
      ).populate("favCoins");
      return updatedUser;
    },

    addChart: async (
      parent,
      {
        coinId,
        coinName,
        symbol,
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
        await Coins.create({ coinName, coinId, symbol, image: imageSmall });
      }

      const newChart = await Charts.create({
        coinId,
        coinName,
        symbol,
        chartDescription,
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
    // removeUser: async (parent, { userId }) => {
    //   return Users.findOneAndDelete({ _id: userId });
    // },
  },
};

module.exports = resolvers;
