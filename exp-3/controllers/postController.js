const posts = require("../data/posts");

// GET all posts
const getPosts = (req, res) => {
  res.json({
    message: "Posts fetched successfully",
    totalPosts: posts.length,
    posts
  });
};

// CREATE post
const createPost = (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required"
    });
  }

  const newPost = {
   id: posts.length > 0
  ? Math.max(...posts.map((post) => post.id)) + 1
  : 1,
    title,
    content,
    createdBy: req.user.username,
    authorName: req.user.name
  };

  posts.push(newPost);

  res.status(201).json({
    message: "Post created successfully",
    post: newPost
  });
};

// UPDATE post
const updatePost = (req, res) => {
  const postId = Number(req.params.id);

  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  const { title, content } = req.body;

  if (title) post.title = title;
  if (content) post.content = content;

  res.json({
    message: "Post updated successfully",
    post
  });
};

// DELETE post
const deletePost = (req, res) => {
  const postId = Number(req.params.id);

  const postIndex = posts.findIndex((p) => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  const deletedPost = posts.splice(postIndex, 1);

  res.json({
    message: "Post deleted successfully",
    post: deletedPost[0]
  });
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost
};