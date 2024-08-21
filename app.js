require("dotenv").config();
const express = require("express");
const rateLimiter = require("./config/rateLimiter");
const autbotRoutes = require("./routes/autbotRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const db = require("./models");

const app = express();

// Middlewares
app.use(express.json());
app.use(rateLimiter); // Apply rate limiting

(async () => {
  await db.sequelize.sync();
})();
// Routes
app.use("/api/autobots", autbotRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({error: "Something went wrong!"});
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
