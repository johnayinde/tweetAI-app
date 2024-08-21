const express = require("express");
const router = express.Router();
const autbotController = require("../controllers/autbotController");

// Routes
router.get("/", autbotController.getAutobots);
router.get("/:id/posts", autbotController.getAutobotPosts);

module.exports = router;
