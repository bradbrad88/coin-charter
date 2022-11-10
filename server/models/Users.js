// Import Mongoose methods
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// setup validators here

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
    password: {
      type: String,
      unique: false,
      required: true,
      minLength: [8, "Password too short, 8 minimum."],
      maxLength: [15, "Password too long, 15 maximum."],
    },
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
    favCoins: [
      {
        type: Schema.Types.ObjectId,
        ref: "coins",
      },
    ],
    image: { type: String, required: false },
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
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Virtual gor amount of favourite coins
userSchema.virtual("favCoinCount").get(function () {
  return this.favCoins.length;
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create user model with userSchema
const Users = model("users", userSchema);

module.exports = Users;
