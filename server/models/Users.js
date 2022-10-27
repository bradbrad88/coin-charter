// Import Mongoose methods
const { Schema, model } = require("mongoose");

// setup validators here

// coins favourites can be subdoc of Users
// Favourite coins schema

const favouriteCoinSchema = new Schema({
  coinName: {
    type: String,
    required: true,
  },
  // Might need a coin id for reference to all coins that might be given from the third party api, not sure
});

// need to add in profile picture for user, think it's a string with img url

// Users schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      maxLength: [15, "Too long, needs to be under 15 characters"],
    },
    // need to add in password and add in validators
    subTitle: {
      type: String,
      required: false,
      maxLength: [24, "Too long, needs to be under 24 characters"],
    },
    // optional if we want email and then can add email validator
    email: {
      type: String,
      unique: true,
      required: true,
      //validate with validator method above
      // match with regex
    },
    bio: {
      type: String,
      required: false,
      maxLength: [250, "Too long, needs to be under 250 characters"],
    },
    // optional if we want a profile picture as well
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "friends",
      },
    ],
    favCoins: [favouriteCoinSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

// Virtuals
// Virtual for amount of friends
userSchema.virtual("friendsCount").get(function () {
  return this.friends.length;
});

// Virtual gor amount of favourite coins
userSchema.virtual("favCoinCount").get(function () {
  return this.favCoins.length;
});

// Create user model with userSchema
const Users = model("users", userSchema);

module.exports = Users;
