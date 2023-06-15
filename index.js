const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io")

app.use(cors());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "https://phenomenal-belekoy-747b59.netlify.app",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);

    })

    socket.on("disconnect", (socket) => {
        console.log("disconnected", socket.id);
    })
})

httpServer.listen(3001, () => {
  console.log("SERVER IS UP AND RUNNING");
});