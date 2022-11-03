const { Charts, Coins, Comments, Users } = require("../models");
const { signToken } = require("../utils/auth");
const TOKEN_AGE = 1000 * 60 * 60 * 24;
// TODO add in sorting filters

// ? can make into seperate folders

// https://www.mongodb.com/community/forums/t/graphql-and-mongoose-relationship/106136
// * info about the relationships for resolvers

const resolvers = {
  Query: {
    users: async () => {
      // ? not sure if populate with Users again because of self-reference
      return await Users.find({}).populate("comments");
    },
    user: async (parent, args) => {
      return await Users.findById(args.id).populate("comments");
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
  },
  Mutation: {
    addUser: async (parent, { username, email, password }, { res }) => {
      const user = await Users.create({ username, email, password });
      const token = signToken(user);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: TOKEN_AGE,
      });
      return user;
    },
    // removeUser: async (parent, { userId }) => {
    //   return Users.findOneAndDelete({ _id: userId });
    // },
  },
};

module.exports = resolvers;
