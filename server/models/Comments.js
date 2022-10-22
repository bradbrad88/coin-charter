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
    createdAt: {
      type: Date,
      default: () => Date.now(),
      get: (date) => timeSince(date),
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

// Create Comments model with commentSchema
const Comments = model("comments", commentSchema);

module.exports = Comments;
