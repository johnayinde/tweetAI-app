const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Routes
router.get("/:id/comments", postController.getPostComments);

module.exports = router;
