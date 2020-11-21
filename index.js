const express = require("express");
const socket = require("socket.io");
const app = express();

const server = app.listen(5050, () => {
  console.log("Listening on port 5050");
});

const io = socket(server);

let messagesArray = [];

io.on("connection", (socket) => {
  console.log("made socket connection" + "  " + socket.id);
  socket.on("Chat", (message) => {
    console.log(message);

    messagesArray = [message, ...messagesArray];
    io.sockets.emit("Chat", messagesArray);
  });
});

app.get("/", (req, res) => {
  res.send("Connected");
});
