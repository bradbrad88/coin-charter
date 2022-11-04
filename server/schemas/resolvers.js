const { Charts, Coins, Comments, Users } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const TOKEN_AGE = 1000 * 60 * 60 * 24;
const sharp = require("sharp");
const upload = require("../utils/s3");
const IMG_SIZE = 300;
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
    logoutUser: async (parent, args, { res, user }) => {
      if (!user) {
        return false;
      }
      res.clearCookie("token");
      return true;
    },
    addImage: async (parent, { image }, { user }) => {
      if (!user) throw new AuthenticationError();
      let imageBuffer = new Buffer.from(image, "base64");
      const { height, width } = await sharp(imageBuffer).metadata();
      if (height > IMG_SIZE || width > IMG_SIZE)
        imageBuffer = await sharp(imageBuffer)
          .resize({
            height: IMG_SIZE,
            width: IMG_SIZE,
            fit: "cover",
          })
          .png()
          .toBuffer();
      const url = await upload(imageBuffer, `${user._id}-profile.png`);
      await Users.findByIdAndUpdate(
        user._id,
        { $set: { image: url } },
        { new: true },
      );
      return url;
    },

    // removeUser: async (parent, { userId }) => {
    //   return Users.findOneAndDelete({ _id: userId });
    // },
  },
};

module.exports = resolvers;
