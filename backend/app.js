require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const http = require("http");

const rateLimiter = require("./config/rateLimiter");
const autbotRoutes = require("./routes/autbotRoutes");
const postRoutes = require("./routes/postRoutes");
const db = require("./models");
const {generateAutobots} = require("./task");

const app = express();
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const cors = require("cors");

// Middlewares
app.use(express.json());
app.use(rateLimiter); // Apply rate limiting.
app.use(cors({origin: "*"}));

io.on("connection", (socket) => {
  console.log(`Socket connected`);

  // Emit current Autobot count to newly connected client
  db.Autobot.count().then((count) => {
    socket.emit("autobotCount", {count});
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });

  socket.on("error", (err) => {
    console.error(`Socket error on ${socket.id}:`, err);
  });
});

// Routes
app.use("/api/autobots", autbotRoutes);
app.use("/api/posts", postRoutes);

//Schedule the generateAutobots function to run every 1 hour
cron.schedule("0 * * * *", async () => {
  await generateAutobots();

  const totalAutobots = await db.Autobot.count();
  io.emit("autobotCount", {count: totalAutobots});
});

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
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
