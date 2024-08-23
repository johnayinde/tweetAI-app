const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Routes
router.get("/:postId/comments", postController.getPostComments);

module.exports = router;
