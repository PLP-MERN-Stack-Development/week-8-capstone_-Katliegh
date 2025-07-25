const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*" }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes (Updated to use the combined routes/index.js)
const mainRouter = require("./routes"); // Imports routes/index.js
app.use("/api", mainRouter); // All routes now start with /api

// Alternative (if you prefer individual routes for clarity):
// const authRoutes = require("./routes/authRoutes");
// const tutoringRoutes = require("./routes/tutoringRoutes");
// const textbookRoutes = require("./routes/textbookRoutes");
// const resourceRoutes = require("./routes/resourceRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");
// const userRoutes = require("./routes/userRoutes");
// app.use("/api/auth", authRoutes);
// app.use("/api/tutoring", tutoringRoutes);
// app.use("/api/textbooks", textbookRoutes);
// app.use("/api/resources", resourceRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/user", userRoutes);

// Socket.io for chat
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

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    server.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error("MongoDB connection error:", err));