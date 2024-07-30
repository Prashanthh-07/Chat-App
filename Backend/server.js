
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoute");
const messageRoute = require("./routes/messageRoute");
require("dotenv").config();
const http = require("http");
const socketIO = require("socket.io");

const app = express();

app.use(cors({
  origin: "https://prash-chat-app.onrender.com",
  methods: ["GET", "POST"],
  credentials: true,
})); 

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);


mongoose.connect(process.env.MONGO_URL,)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "https://prash-chat-app.onrender.com",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
