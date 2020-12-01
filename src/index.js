require("./models/Chat");
const express = require("express");
const socket = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const fetchAllMessages = require("./actions/fetchAllMessages");
const app = express();
app.use(cors());

const mongoUri =
  "mongodb+srv://admin:admin@cluster0.3o0rk.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("coonnected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.log("Error Connecting to Mongo", err);
});

const Chat = mongoose.model("Chat");

const server = app.listen(5050, () => {
  console.log("Listening on port 5050");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const saveToMongoDb = async (message) => {
  const { text, user, _id, createdAt } = message;
  const chat = new Chat({ text, user, _id, createdAt });
  await chat.save();
};

const getData = async () => {
  const data = await fetchAllMessages();
  io.sockets.emit("Chat", data);
};

io.on("connection", (socket) => {
  console.log("made socket connection" + "  " + socket.id);
  socket.on("Chat", async (message) => {
    saveToMongoDb(message);
    getData();
  });
  getData();
});

app.get("/", (req, res) => {
  res.send("Connected");
});
