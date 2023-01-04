import db from "../config/connection.js";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import { signToken, setCookie } from "../utils/auth.js";
import {
  GraphQLScalarType,
  Kind,
  GraphQLScalarValueParser,
  GraphQLError,
} from "graphql";
import { PubSub, withFilter } from "graphql-subscriptions";
import { Resolvers } from "./__generated__/resolvers-types.js";
import {
  SendEmailCommand,
  SendTemplatedEmailCommand,
  SESClient,
} from "@aws-sdk/client-ses";
import client from "../config/ses.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) throw new Error("Missing environment variable: JWT_SECRET");

const pubsub = new PubSub();

const resolvers: Resolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "DateTime scalar type",
    parseValue(value) {
      if (typeof value === "string") {
        const date = new Date(value);
        return date;
      }
      throw new UserInputError("Bad input");
    },
    parseLiteral(ast) {
      console.log("Parse literal", typeof ast);
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10));
      }
      return null;
    },
    serialize(value) {
      if (value instanceof Date) {
        return value.getTime();
      }
      // return new Intl.DateTimeFormat("en-au", { dateStyle: "short" }).format(
      //   date,
      // );
    },
  }),

  // Friend: {
  //   friend: (friend) => {
  //     console.log(friend);
  //     const id = friend?.friendId;
  //     if (!id) return null;
  //     return db.user.findUnique({ where: { id } });
  //   },
  // },

  User: {
    friends: async (user) => {
      if (!user.id) return [];
      const userWithFriends = await db.user.findUnique({
        where: { id: user.id },
        include: {
          friends: {
            select: {
              friend: {
                select: {
                  id: true,
                  bio: true,
                  image: true,
                  username: true,
                  subtitle: true,
                },
              },
              createdAt: true,
              verified: true,
            },
          },
        },
      });
      return (
        userWithFriends?.friends.map((friend) => ({
          ...friend.friend,
          createdAt: friend.createdAt,
          verified: friend.verified,
        })) || []
      );
    },
    friendCount: async (user) => {
      if (!user.id) return 0;
      const friendCount = await db.friend.aggregate({
        _count: { _all: true },
        where: { userId: user.id },
      });
      console.log(friendCount);
      return friendCount._count._all || 0;
    },
  },

  Query: {
    users: async () => {
      const users = await db.user.findMany({});
      return users;
    },
    user: async (parent, args) => {
      const user = await db.user.findUnique({ where: { id: args.id } });
      if (!user) throw new GraphQLError("Ahhhhh");
      return user;
    },
    // comment: async (parent, args) => {
    //   return await Comments.findById(args.id)
    //     .populate("users")
    //     .populate({ path: "users", populate: "comments" });
    // },
    // chartComments: async (parent, { chartId }) => {
    //   return await Comments.find({ chartId });
    // },
    // coinComments: async (parent, { coinId }) => {
    //   return await Comments.find({ coinId });
    // },
    // coin: async (parent, { coinId }) => {
    //   const findCoin = await Coins.findOne({ coinId })
    //     .populate("coinCharts")
    //     .populate({ path: "coinCharts", populate: "chartComments" })
    //     .populate("coinComments")
    //     .populate({ path: "coinComments", populate: "userId" });

    //   if (!findCoin) {
    //     throw new AuthenticationError();
    //   }
    //   return findCoin;
    // },
    // coins: async (parent, args) => {
    //   return await Coins.findById(args.id)
    //     .populate("comments")
    //     .populate({ path: "comments", populate: "users" })
    //     .populate("charts")
    //     .populate({ path: "charts", populate: "comments" });
    // },
    // favCoins: async (_, __, { user: userId }) => {
    //   const user = await Users.findById(userId).populate({
    //     path: "favCoins",
    //     populate: "coin",
    //   });
    //   return user.favCoins;
    // },
    // charts: async () => {
    //   return await Charts.find({})
    //     .populate("chartComments")
    //     .populate({ path: "chartComments", populate: "userId" })
    //     .populate("upVotes");
    // },
    // chart: async (parent, { chartId }) => {
    //   return await db.chart.findUnique({ where: { id: chartId } });

    //   // return await Charts.findById(chartId)
    //   //   .populate("chartComments")
    //   //   .populate({ path: "chartComments", populate: "userId" })
    //   //   .populate("upVotes");
    // },
    // userCharts: async (parent, { userId }) => {
    //   const user = await Users.findById(userId).populate("charts");
    //   return user.charts;
    // },
    // searchUsers: async (parent, { query }) => {
    //   const regex = new RegExp(`.*${query}.*`, "i");
    //   const users = await Users.find({ username: regex }).populate("comments");
    //   return users;
    // },
    // friendRequests: async (parent, args, { user }) => {
    //   if (!user) throw new AuthenticationError();
    //   const requests = await Users.findById(user).populate({
    //     path: "receivedFriendRequests",
    //     populate: "user",
    //   });
    //   return requests.receivedFriendRequests;
    // },
    // friends: async (parent, args, { user: userId }) => {
    //   if (!userId) throw new AuthenticationError();

    //   const user = await Users.findById(userId)
    //     .populate("charts")
    //     .populate("comments")
    //     .populate({ path: "friends", populate: "friend" });
    //   return user.friends;
    // },
    // recentActivity: async (parent, args, { user: userId }) => {
    //   if (!userId) throw new AuthenticationError();

    //   const user = await Users.findById(userId).populate({
    //     path: "friends",
    //     populate: "friend",
    //   });
    //   const activities = user.friends.flatMap(({ friend }) =>
    //     friend.recentActivity.map((activity) => {
    //       const newActivity = activity.toJSON();
    //       newActivity.time = new Date(activity.createdAt).getTime();
    //       return newActivity;
    //     }),
    //   );
    //   activities.sort((a, b) => b.time - a.time);
    //   const filteredActivities = activities.slice(0, 10);
    //   return filteredActivities;
    // },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }, { res }) => {
      const user = await db.$transaction(async (tx) => {
        const user = await db.user.create({ data: { username } });
        const emailVerificationRecord = await db.emailVerification.create({
          data: { userId: user.id, email },
        });
        const hash = await bcrypt.hash(password, 10);
        await db.userIdentity.create({
          data: { userId: user.id, method: "PASSWORD", lookup: hash },
        });
        return { ...user, emailVerificationRecord: emailVerificationRecord.id };
      });
      const token = jwt.sign({ id: user.emailVerificationRecord }, JWT_SECRET, {
        expiresIn: 60 * 15,
      });
      const verifyLink = `http://localhost:3000/api/verify-email/${token}`;
      const command = new SendTemplatedEmailCommand({
        Destination: { ToAddresses: [email] },
        Source: "verify@bradteague.com",
        Template: "VerifyEmail",
        TemplateData: JSON.stringify({ user: username, verifyLink }),
      });
      await client.send(command);
      return user;
    },
    loginUser: async (parent, { email, password }, { res }) => {
      const error = new AuthenticationError("Unable to login");
      const user = await db.user.findFirst({
        where: { VerifiedEmails: { some: { email } } },
        include: { UserIdentity: { where: { method: "PASSWORD" } } },
      });
      if (!user) throw error;
      console.log(user);
      if (user?.UserIdentity.length < 1) throw error;
      const success = await bcrypt.compare(
        password,
        user.UserIdentity[0].lookup,
      );
      if (!success) throw error;
      const accessToken = signToken(user);
      return { user, accessToken };
    },
    logoutUser: async (parent, args, { res, user }) => {
      if (!user) {
        return false;
      }
      res.clearCookie("token");
      return true;
    },
    // addImage: async (parent, { image }, { user }) => {
    //   await Users.findByIdAndUpdate(
    //     user._id,
    //     { $set: { image } },
    //     { new: true },
    //   );
    //   return image;
    // },
    // addBio: async (parent, { bio }, { user }) => {
    //   if (!user) throw new AuthenticationError();
    //   let updatedUser = await Users.findByIdAndUpdate(
    //     user._id,
    //     { $set: { bio } },
    //     { new: true },
    //   );

    //   const activity = {
    //     text: "updated their bio",
    //     value: null,
    //     path: `/profile/${user._id}`,
    //   };

    //   await addRecentActivity(user._id, activity);

    //   return bio;
    // },
    // addCoin: async (parent, { coinId, coinName, symbol, image }, { user }) => {
    //   if (!user) throw new AuthenticationError();
    //   const coin = await Coins.findOneAndUpdate(
    //     { coinId },
    //     { $set: { coinId, coinName, symbol, image } },
    //     { new: true, upsert: true },
    //   );
    //   let updatedUser = await Users.findByIdAndUpdate(
    //     user,
    //     { $push: { favCoins: { $each: [{ coin: coin._id }], $position: 0 } } },
    //     { new: true, timestamps: true },
    //   ).populate({ path: "favCoins", populate: "coin" });

    //   const activity = {
    //     text: "favourited a new coin:",
    //     value: symbol,
    //     path: `/coin/${coinId}`,
    //   };

    //   updatedUser = await addRecentActivity(updatedUser, activity);

    //   return updatedUser;
    // },
    // removeCoin: async (parent, { coinId }, { user }) => {
    //   if (!user) throw new AuthenticationError();
    //   const coin = await Coins.findOne({ coinId });
    //   const updatedUser = await Users.findByIdAndUpdate(
    //     user,
    //     { $pull: { favCoins: { coin: coin._id } } },
    //     { new: true },
    //   ).populate({ path: "favCoins", populate: "coin" });
    //   return updatedUser;
    // },
    // addChartComment: async (
    //   parent,
    //   { commentText, chartId },
    //   { user: userId },
    // ) => {
    //   if (!userId) throw new AuthenticationError();
    //   const findUser = await Users.findById(userId);
    //   const newComment = await Comments.create({
    //     commentText,
    //     username: findUser.username,
    //     userId: userId,
    //     image: findUser.image,
    //     chartId,
    //   });

    //   const findChart = await Charts.findById(chartId);

    //   await findChart.updateOne(
    //     { $push: { chartComments: newComment._id } },
    //     { new: true },
    //   );
    //   const updatedUser = await findUser.updateOne(
    //     {
    //       $push: { comments: newComment._id },
    //     },
    //     { new: true },
    //   );

    //   return updatedUser;
    // },
    // addCoinComment: async (
    //   parent,
    //   { commentText, coinId, coinName },
    //   { user: userId },
    // ) => {
    //   if (!userId) throw new AuthenticationError();
    //   const findUser = await Users.findById(userId);
    //   const newComment = await Comments.create({
    //     commentText,
    //     username: findUser.username,
    //     userId: userId,
    //     image: findUser.image,
    //     coinId,
    //     coinName,
    //   });
    //   await Coins.findOneAndUpdate(
    //     { coinId },
    //     { $push: { coinComments: newComment._id } },
    //     { new: true },
    //   );
    //   let updatedUser = await findUser.updateOne(
    //     {
    //       $push: { comments: newComment._id },
    //     },
    //     { new: true },
    //   );
    //   return updatedUser;
    // },
    // addChart: async (
    //   parent,
    //   {
    //     coinId,
    //     coinName,
    //     symbol,
    //     chartTitle,
    //     chartDescription,
    //     imageThumbnail,
    //     imageMedium,
    //     imageSmall,
    //   },
    //   { user: userId },
    // ) => {
    //   if (!userId) throw new AuthenticationError();
    //   const newCoin = await Coins.findOne({ coinId: coinId });
    //   if (!newCoin) {
    //     await Coins.create({ coinName, coinId, symbol });
    //   }

    //   const user = await Users.findById(userId);
    //   const newChart = await Charts.create({
    //     coinId,
    //     coinName,
    //     symbol,
    //     chartTitle,
    //     chartDescription,
    //     username: user.username,
    //     userId: userId,
    //     imageThumbnail,
    //     imageMedium,
    //     imageSmall,
    //   });
    //   await Coins.findOneAndUpdate(
    //     { coinId },
    //     { $push: { coinCharts: newChart._id } },
    //     { new: true },
    //   );
    //   const updatedUser = await user.updateOne(
    //     {
    //       $push: { charts: newChart._id },
    //     },
    //     { new: true },
    //   );

    //   const activity = {
    //     text: "added a new chart:",
    //     value: chartTitle,
    //     path: `/chart/${newChart._id}`,
    //   };

    //   await addRecentActivity(user._id, activity);

    //   return updatedUser;
    // },

    // upVoteChart: async (_, { id, vote }, { user }) => {
    //   if (!user) throw new AuthenticationError();

    //   if (vote) {
    //     const chart = await Charts.findByIdAndUpdate(
    //       id,
    //       { $addToSet: { upVotes: user._id } },
    //       { new: true },
    //     );
    //     return await chart.updateOne(
    //       { $pull: { downVotes: user._id } },
    //       { new: true },
    //     );
    //   } else {
    //     const chart = await Charts.findByIdAndUpdate(id, {
    //       $pull: { upVotes: user._id },
    //     });
    //     return chart;
    //   }
    // },
    // downVoteChart: async (_, { id, vote }, { user }) => {
    //   if (!user) throw new AuthenticationError();

    //   if (vote) {
    //     const chart = await Charts.findByIdAndUpdate(
    //       id,
    //       { $addToSet: { downVotes: user._id } },
    //       { new: true },
    //     );
    //     return await chart.updateOne(
    //       { $pull: { upVotes: user._id } },
    //       { new: true },
    //     );
    //   } else {
    //     return await Charts.findByIdAndUpdate(
    //       id,
    //       { $pull: { downVotes: user._id } },
    //       { new: true },
    //     );
    //   }
    // },

    // sendFriendRequest: async (parent, args, { user }) => {
    //   if (!user) throw new AuthenticationError();
    //   const request = { ...args };
    //   pubsub.publish("NEW_FRIEND_REQUEST", {
    //     newFriendRequest: { ...request },
    //   });
    //   delete request.friendId;
    //   await Users.findOneAndUpdate(
    //     {
    //       _id: args.friendId,
    //       "receivedFriendRequests.userId": { $ne: args.userId },
    //     },
    //     {
    //       $push: { receivedFriendRequests: request },
    //     },
    //     { new: true },
    //   );

    //   return true;
    // },
    // acceptFriendRequest: async (parent, { friendId }, { user: userId }) => {
    //   if (!userId) throw new AuthenticationError();

    //   const user = await Users.findById(userId);

    //   const valid = await user.isValidRequest(friendId);

    //   if (!valid) throw new Error("nope");

    //   await user.updateOne({
    //     $pull: {
    //       receivedFriendRequests: { userId: friendId },
    //     },
    //   });

    //   const friend = await Users.findById(friendId);
    //   if (!friend) throw new Error("they don't exist");

    //   const updatedUser = Users.updateOne(
    //     { _id: user._id, "friends.friend": { $ne: friend._id } },
    //     { $push: { friends: { friend: friendId } } },
    //     { new: true, timestamps: true },
    //   );

    //   await friend.updateOne(
    //     { $addToSet: { friends: { friend: user._id } } },
    //     { timestamps: true },
    //   );
    //   return updatedUser;
    // },
    // declineFriendRequest: async (parent, { friendId }, { user: userId }) => {
    //   if (!userId) throw new AuthenticationError();

    //   await Users.findByIdAndUpdate(userId, {
    //     $pull: { receivedFriendRequests: { userId: friendId } },
    //   });

    //   return true;
    // },
  },
  Subscription: {
    // newFriendRequest: {
    //   subscribe: withFilter(
    //     () => pubsub.asyncIterator(["NEW_FRIEND_REQUEST"]),
    //     (payload, variables) => {
    //       console.log(payload);
    //       return payload.newFriendRequest.friendId === variables.userId;
    //     },
    //   ),
    // },
  },
};

interface RecentItem {}

async function addRecentActivity(userId: string, item: RecentItem) {
  // if (!userId) return;
  // const user = await Users.findById(userId);
  // if (!user) return;
  // const activity = { ...item, username: user.username, image: user.image };
  // let updatedUser = await Users.findByIdAndUpdate(
  //   userId,
  //   { $push: { recentActivity: { $each: [activity], $position: 0 } } },
  //   { timestamps: true, new: true },
  // );
  // if (updatedUser.recentActivity.length > 20) {
  //   updatedUser = await Users.findByIdAndUpdate(userId, {
  //     $pop: { recentActivity: 1 },
  //   });
  // }
  // return updatedUser;
}

export default resolvers;
