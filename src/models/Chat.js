const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  text: String,
  user: {
    _id: Number,
  },
  _id: String,
  createdAt: String,
});

mongoose.model("Chat", chatSchema);
