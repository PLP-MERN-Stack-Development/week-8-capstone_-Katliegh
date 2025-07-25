const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// ✅ Correct frontend URL (no trailing slash)
const frontendUrl = "https://unimatek.netlify.app";

// ✅ CORS for socket.io
const io = require("socket.io")(server, {
  cors: {
    origin: frontendUrl,
    methods: ["GET", "POST"]
  }
});

// ✅ CORS middleware for API
app.use(cors({
  origin: frontendUrl,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ Load API routes
const mainRouter = require("./routes");
app.use("/api", mainRouter);

// ✅ Socket.io chat setup
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on("message", ({ room, message }) => {
    io.to(room).emit("message", message);
    console.log(`Message in ${room}:`, message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    server.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error("MongoDB connection error:", err));
