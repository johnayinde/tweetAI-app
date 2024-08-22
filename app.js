require("dotenv").config();
const express = require("express");
const cron = require("node-cron");

const rateLimiter = require("./config/rateLimiter");
const autbotRoutes = require("./routes/autbotRoutes");
const postRoutes = require("./routes/postRoutes");
const db = require("./models");
const {generateAutobots} = require("./task");
// check all comments
// cors
// proper namings/file structures
// Frontemd
const app = express();

// Middlewares
app.use(express.json());
app.use(rateLimiter); // Apply rate limiting

// Routes
app.use("/api/autobots", autbotRoutes);
app.use("/api/posts", postRoutes);

// Schedule the generateAutobots function to run every 1 hour
cron.schedule("0 * * * *", generateAutobots); //1hr

// cron.schedule("*/20 * * * * *", generateAutobots); //20sec

// cron.schedule("*/3 * * * *", generateAutobots); // 2min

// 404 Error handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
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
