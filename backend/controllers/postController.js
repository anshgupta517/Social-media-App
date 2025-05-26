import Post from "../models/Post.js";
const createPost = async (req, res) => {
  const { content } = req.body;
  const post = new Post({ content, author: req.user.userId });
  await post.save();
  res.status(201).json(post);
};

const getPosts = async (req, res) => {
  const posts = await Post.find({ author: req.user.userId }).populate("author", "username");
  res.json(posts);
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createPost, getPosts, getAllPosts };

