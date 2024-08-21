require("dotenv").config();
const express = require("express");
const cron = require("node-cron");

const rateLimiter = require("./config/rateLimiter");
const autbotRoutes = require("./routes/autbotRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const db = require("./models");
const {generateAutobots} = require("./task");

const app = express();

// Middlewares
app.use(express.json());
app.use(rateLimiter); // Apply rate limiting
// Routes
app.use("/api/autobots", autbotRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Schedule the generateAutobots function to run every 1 hour
cron.schedule("0 * * * *", generateAutobots);

// cron.schedule("*/10 * * * * *", generateAutobots);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({error: "Something went wrong!"});
});

db.sequelize
  .sync({alter: true})
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
