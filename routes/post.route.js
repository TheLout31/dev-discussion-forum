const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const postModel = require("../models/post.model");
const PostRouter = express.Router();

// Create a post
PostRouter.post("/create-post", authMiddleware("User"), async (req, res) => {
  const userId = req.user;
  try {
    const { title, content, author, tags } = req.body;

    const newPost = new postModel({
      title,
      content,
      author: userId,
      tags,
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
});

PostRouter.get("/", authMiddleware("User"), async (req, res) => {
  const userId = req.user;
  
  try {
    const posts = await postModel.find({ author:userId }).populate({path:"author" , select:"_id name email role"});
    res.status(201).json({ message: "List of Posts", posts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
});

// Add a comment to a post
PostRouter.post(
  "/:postId/create-comment",
  authMiddleware("User"),
  async (req, res) => {
    try {
      const { postId } = req.params;
      const userId = req.user;
      const { user, text } = req.body;

      const post = await postModel.findById(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });

      post.comments.push({ user: userId, text });
      await post.save();

      res.status(201).json({ message: "Comment added successfully", post });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error adding comment", error: error.message });
    }
  }
);

module.exports = PostRouter;
