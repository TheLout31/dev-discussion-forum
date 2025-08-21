const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    text: {
      type: String,
      required: true,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // prevents Mongoose from auto-creating _id for subdocs
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 20,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tags",
      },
    ],
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    comments: [commentSchema],
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically for posts
  }
);

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
