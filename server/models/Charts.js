const { Schema, model, Types } = require("mongoose");

// Use the coinId that is given from the third party api call that then gets used with in the database to retrieve charts for that coin
// Not too sure what to put in for the actual chart itself

// Chart schema
const chartSchema = new Schema(
  {
    coinId: {
      type: String,
      ref: "coins",
      required: true,
    },
    coinName: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    chartTitle: {
      type: String,
      required: false,
      maxLength: [35, "Too many characters, max length is 35"],
    },
    chartDescription: {
      type: String,
      required: false,
      maxLength: [250, "Too many characters, max length is 250"],
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    imageThumbnail: {
      type: String,
    },
    imageMedium: {
      type: String,
    },
    imageSmall: {
      type: String,
    },
    chartComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
    upVotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    downVotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
    id: false,
  },
);

// Virtuals
// Amount of comments on chart
chartSchema.virtual("commentCount").get(function () {
  return this.chartComments.length;
});

chartSchema.virtual("upVoteCount").get(function () {
  return this.upVotes.length;
});

chartSchema.virtual("downVoteCount").get(function () {
  return this.downVotes.length;
});

// Create Charts model with chartSchema
const Charts = model("charts", chartSchema);

module.exports = Charts;
