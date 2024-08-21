const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Routes (if needed, otherwise this could be merged with PostRoutes)
// e.g., Get a specific comment by ID
router.get("/:id", commentController.getComment);

module.exports = router;
