import db from "../config/connection.js";
// const { AuthenticationError } = require("apollo-server-express");
import { AuthenticationError } from "apollo-server-express";
// const { signToken, setCookie } = require("../utils/auth");
import { signToken, setCookie } from "../utils/auth.js";
// const { GraphQLScalarType, Kind } = require("graphql");
import { GraphQLScalarType, Kind } from "graphql";
// const { PubSub, withFilter } = require("graphql-subscriptions");
import { PubSub, withFilter } from "graphql-subscriptions";

const pubsub = new PubSub();

const resolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "DateTime scalar type",

    serialize(value) {
      const date = new Date(value);

      return date.toUTCString();
    },
    parseValue(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }

      return null;
    },
    serialize(value) {
      const date = new Date(value);
      return new Intl.DateTimeFormat("en-au", { dateStyle: "short" }).format(
        date,
      );
    },
  }),

  Friend: {
    friend: (friend) => {
      return db.user.findUnique({ where: { id: friend.friendId } });
    },
  },

  Query: {
    users: async () => {
      const users = await db.user.findMany({ include: { friends: true } });
      return users;
    },
    user: async (parent, args) => {
      const user = await db.user.findUnique(args.id);
      // const user = await Users.findById(args.id)
      //   .populate("comments")
      //   .populate({ path: "favCoins", populate: "coin" });
      return user;
    },
    comment: async (parent, args) => {
      return await Comments.findById(args.id)
        .populate("users")
        .populate({ path: "users", populate: "comments" });
    },
    chartComments: async (parent, { chartId }) => {
      return await Comments.find({ chartId });
    },
    coinComments: async (parent, { coinId }) => {
      return await Comments.find({ coinId });
    },
    coin: async (parent, { coinId }) => {
      const findCoin = await Coins.findOne({ coinId })
        .populate("coinCharts")
        .populate({ path: "coinCharts", populate: "chartComments" })
        .populate("coinComments")
        .populate({ path: "coinComments", populate: "userId" });

      if (!findCoin) {
        throw new AuthenticationError();
      }
      return findCoin;
    },
    coins: async (parent, args) => {
      return await Coins.findById(args.id)
        .populate("comments")
        .populate({ path: "comments", populate: "users" })
        .populate("charts")
        .populate({ path: "charts", populate: "comments" });
    },
    favCoins: async (_, __, { user: userId }) => {
      const user = await Users.findById(userId).populate({
        path: "favCoins",
        populate: "coin",
      });
      return user.favCoins;
    },
    charts: async () => {
      return await Charts.find({})
        .populate("chartComments")
        .populate({ path: "chartComments", populate: "userId" })
        .populate("upVotes");
    },
    chart: async (parent, { chartId }) => {
      return await db.chart.findUnique({ where: { id: chartId } });

      // return await Charts.findById(chartId)
      //   .populate("chartComments")
      //   .populate({ path: "chartComments", populate: "userId" })
      //   .populate("upVotes");
    },
    userCharts: async (parent, { userId }) => {
      const user = await Users.findById(userId).populate("charts");
      return user.charts;
    },
    searchUsers: async (parent, { query }) => {
      const regex = new RegExp(`.*${query}.*`, "i");
      const users = await Users.find({ username: regex }).populate("comments");
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

      const user = await Users.findById(userId).populate({
        path: "friends",
        populate: "friend",
      });
      const activities = user.friends.flatMap(({ friend }) =>
        friend.recentActivity.map((activity) => {
          const newActivity = activity.toJSON();
          newActivity.time = new Date(activity.createdAt).getTime();
          return newActivity;
        }),
      );
      activities.sort((a, b) => b.time - a.time);
      const filteredActivities = activities.slice(0, 10);
      return filteredActivities;
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }, { res }) => {
      const user = await db.user.create({ data: { username } });
      return user;
      // const user = await Users.create({ username, email, password });
      // const token = signToken(user);
      // setCookie(res, token);
      // return user.populate({ path: "favCoins", populate: "coin" });
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
      let updatedUser = await Users.findByIdAndUpdate(
        user._id,
        { $set: { bio } },
        { new: true },
      );

      const activity = {
        text: "updated their bio",
        value: null,
        path: `/profile/${user._id}`,
      };

      await addRecentActivity(user._id, activity);

      return bio;
    },
    addCoin: async (parent, { coinId, coinName, symbol, image }, { user }) => {
      if (!user) throw new AuthenticationError();
      const coin = await Coins.findOneAndUpdate(
        { coinId },
        { $set: { coinId, coinName, symbol, image } },
        { new: true, upsert: true },
      );
      let updatedUser = await Users.findByIdAndUpdate(
        user,
        { $push: { favCoins: { $each: [{ coin: coin._id }], $position: 0 } } },
        { new: true, timestamps: true },
      ).populate({ path: "favCoins", populate: "coin" });

      const activity = {
        text: "favourited a new coin:",
        value: symbol,
        path: `/coin/${coinId}`,
      };

      updatedUser = await addRecentActivity(updatedUser, activity);

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
    addChartComment: async (
      parent,
      { commentText, chartId },
      { user: userId },
    ) => {
      if (!userId) throw new AuthenticationError();
      const findUser = await Users.findById(userId);
      const newComment = await Comments.create({
        commentText,
        username: findUser.username,
        userId: userId,
        image: findUser.image,
        chartId,
      });

      const findChart = await Charts.findById(chartId);

      await findChart.updateOne(
        { $push: { chartComments: newComment._id } },
        { new: true },
      );
      const updatedUser = await findUser.updateOne(
        {
          $push: { comments: newComment._id },
        },
        { new: true },
      );

      return updatedUser;
    },
    addCoinComment: async (
      parent,
      { commentText, coinId, coinName },
      { user: userId },
    ) => {
      if (!userId) throw new AuthenticationError();
      const findUser = await Users.findById(userId);
      const newComment = await Comments.create({
        commentText,
        username: findUser.username,
        userId: userId,
        image: findUser.image,
        coinId,
        coinName,
      });
      await Coins.findOneAndUpdate(
        { coinId },
        { $push: { coinComments: newComment._id } },
        { new: true },
      );
      let updatedUser = await findUser.updateOne(
        {
          $push: { comments: newComment._id },
        },
        { new: true },
      );
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
      { user: userId },
    ) => {
      if (!userId) throw new AuthenticationError();
      const newCoin = await Coins.findOne({ coinId: coinId });
      if (!newCoin) {
        await Coins.create({ coinName, coinId, symbol });
      }

      const user = await Users.findById(userId);
      const newChart = await Charts.create({
        coinId,
        coinName,
        symbol,
        chartTitle,
        chartDescription,
        username: user.username,
        userId: userId,
        imageThumbnail,
        imageMedium,
        imageSmall,
      });
      await Coins.findOneAndUpdate(
        { coinId },
        { $push: { coinCharts: newChart._id } },
        { new: true },
      );
      const updatedUser = await user.updateOne(
        {
          $push: { charts: newChart._id },
        },
        { new: true },
      );

      const activity = {
        text: "added a new chart:",
        value: chartTitle,
        path: `/chart/${newChart._id}`,
      };

      await addRecentActivity(user._id, activity);

      return updatedUser;
    },

    upVoteChart: async (_, { id, vote }, { user }) => {
      if (!user) throw new AuthenticationError();

      if (vote) {
        const chart = await Charts.findByIdAndUpdate(
          id,
          { $addToSet: { upVotes: user._id } },
          { new: true },
        );
        return await chart.updateOne(
          { $pull: { downVotes: user._id } },
          { new: true },
        );
      } else {
        const chart = await Charts.findByIdAndUpdate(id, {
          $pull: { upVotes: user._id },
        });
        return chart;
      }
    },
    downVoteChart: async (_, { id, vote }, { user }) => {
      if (!user) throw new AuthenticationError();

      if (vote) {
        const chart = await Charts.findByIdAndUpdate(
          id,
          { $addToSet: { downVotes: user._id } },
          { new: true },
        );
        return await chart.updateOne(
          { $pull: { upVotes: user._id } },
          { new: true },
        );
      } else {
        return await Charts.findByIdAndUpdate(
          id,
          { $pull: { downVotes: user._id } },
          { new: true },
        );
      }
    },

    sendFriendRequest: async (parent, args, { user }) => {
      if (!user) throw new AuthenticationError();
      const request = { ...args };
      pubsub.publish("NEW_FRIEND_REQUEST", {
        newFriendRequest: { ...request },
      });
      delete request.friendId;
      await Users.findOneAndUpdate(
        {
          _id: args.friendId,
          "receivedFriendRequests.userId": { $ne: args.userId },
        },
        {
          $push: { receivedFriendRequests: request },
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

      const updatedUser = Users.updateOne(
        { _id: user._id, "friends.friend": { $ne: friend._id } },
        { $push: { friends: { friend: friendId } } },
        { new: true, timestamps: true },
      );

      await friend.updateOne(
        { $addToSet: { friends: { friend: user._id } } },
        { timestamps: true },
      );
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
  Subscription: {
    newFriendRequest: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(["NEW_FRIEND_REQUEST"]),
        (payload, variables) => {
          console.log(payload);
          return payload.newFriendRequest.friendId === variables.userId;
        },
      ),
    },
  },
};

async function addRecentActivity(userId, item) {
  if (!userId) return;
  const user = await Users.findById(userId);
  if (!user) return;
  const activity = { ...item, username: user.username, image: user.image };
  let updatedUser = await Users.findByIdAndUpdate(
    userId,
    { $push: { recentActivity: { $each: [activity], $position: 0 } } },
    { timestamps: true, new: true },
  );
  if (updatedUser.recentActivity.length > 20) {
    updatedUser = await Users.findByIdAndUpdate(userId, {
      $pop: { recentActivity: 1 },
    });
  }

  return updatedUser;
}

export default resolvers;
