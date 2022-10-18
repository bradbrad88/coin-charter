const { Schema, model, Types } = require("mongoose");

// Use the coinId that is given from the third party api call that then gets used with in the database to retrieve charts for that coin
// Not too sure what to put in for the actual chart itself

// Chart schema
const chartSchema = new Schema(
  {
    coinId: {
      type: Schema.Types.ObjectId,
      ref: "coins",
      required: true,
    },
    coinName: {
      type: String,
      required: true,
    },
    chartDescription: {
      type: String,
      required: false,
      maxLength: [250, "Too many characters, max length is 250"],
    },
    chartComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
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
// Amount of comments on chart
chartSchema.virtual("commentCount").get(function () {
  return this.chartComments.length;
});

// Create Charts model with chartSchema
const Charts = model("charts", chartSchema);

module.exports = Charts;
