// Import Mongoose methods
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// setup validators here

// need to add in profile picture for user, think it's a string with img url
const requestSchema = new Schema(
  {
    userId: String,
    username: String,
    image: String,
    bio: String,
    subTitle: String,
  },
  {
    timestamps: true,
  },
);

const favCoinSchema = new Schema(
  {
    coin: {
      type: Schema.Types.ObjectId,
      ref: "coins",
    },
  },
  { timestamps: true },
);

const friendSchema = new Schema(
  {
    friend: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true },
);

const recentActivitySchema = new Schema(
  {
    text: String,
    value: String,
    path: String,
    image: String,
    username: String,
  },
  { timestamps: true },
);

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
    friends: [friendSchema],
    receivedFriendRequests: [requestSchema],
    favCoins: [favCoinSchema],
    charts: [
      {
        type: Schema.Types.ObjectId,
        ref: "charts",
      },
    ],
    image: { type: String, required: false },
    recentActivity: [recentActivitySchema],
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

userSchema.virtual("chartCount").get(function () {
  return this.charts.length;
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

userSchema.methods.isValidRequest = async function (friendId) {
  const valid = await this.receivedFriendRequests.some((request) => {
    return request.userId === friendId;
  });
  return valid;
};

// Create user model with userSchema
const Users = model("users", userSchema);

module.exports = Users;
