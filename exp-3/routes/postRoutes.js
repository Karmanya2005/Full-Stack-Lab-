const express = require("express");

const {
  getPosts,
  createPost,
  updatePost,
  deletePost
} = require("../controllers/postController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// View posts - Admin, Editor, Viewer
router.get(
  "/",
  authenticateToken,
  getPosts
);

// Create post - Admin, Editor
router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "editor"),
  createPost
);

// Edit post - Admin, Editor
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "editor"),
  updatePost
);

// Delete post - Admin only
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deletePost
);

module.exports = router;