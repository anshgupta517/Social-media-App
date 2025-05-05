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

export { createPost, getPosts };

