const { Schema, model, Types } = require("mongoose");

// Comments schema
const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 250,
    },
    username: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      ref: "users",
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    coinId: {
      type: String,
      ref: "coins",
      required: true,
    },
    coinName: {
      type: String,
      required: true,
    },
    chartId: {
      type: Schema.Types.ObjectId,
      ref: "charts",
    },
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
    id: false,
  },
);

// Create Comments model with commentSchema
const Comments = model("comments", commentSchema);

module.exports = Comments;
