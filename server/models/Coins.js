// coins profile page can use most of the info about the coin from the third party API call like market cap, price etc
// in the model can just have the charts associated, comments associated and a virtual with amount of users that have put it in favourites

const { Schema, model, Types } = require("mongoose");

// Coins schema
const coinSchema = new Schema(
  {
    coinName: {
      type: String,
      required: true,
    },
    // ID given from the third party API that can be used to select the coin from the database and used to get the coin info from the API
    coinId: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    image: String,
    coinComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
    coinCharts: [
      {
        type: Schema.Types.ObjectId,
        ref: "charts",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

// Virtuals
// Amount of comments for coin
coinSchema.virtual("commentCount").get(function () {
  return this.coinComments.length;
});

// Amount of charts for coin
coinSchema.virtual("chartCount").get(function () {
  return this.coinCharts.length;
});

// Coins model with coinSchema
const Coins = model("coins", coinSchema);

module.exports = Coins;
