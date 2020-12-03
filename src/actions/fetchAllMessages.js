const mongoose = require("mongoose");
const Chat = mongoose.model("Chat");
const _ = require("lodash");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("thisIsConfidential");

const fetchAllMessages = async () => {
  try {
    const chatData = await Chat.find({}).sort({ createdAt: -1 });
    return chatData;
  } catch (err) {
    console.log(err);
  }
};

module.exports = fetchAllMessages;
