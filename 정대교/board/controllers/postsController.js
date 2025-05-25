const postsModel = require("../models/postsModel");

exports.getPosts = async (req, res) => {
  const posts = await postsModel.getAll();
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await postsModel.getById(req.params.id);
  res.json(post);
};

exports.createPost = async (req, res) => {
  const { title, content, writer, password } = req.body;
  await postsModel.create(title, content, writer, password);
  res.status(201).json({ message: "Post created" });
};

exports.updatePost = async (req, res) => {
  const { title, content, password } = req.body;
  await postsModel.update(req.params.id, title, content, password);
  res.json({ message: "Post updated" });
};

exports.deletePost = async (req, res) => {
  const { password } = req.body;
  await postsModel.remove(req.params.id, password);
  res.json({ message: "Post deleted" });
};
