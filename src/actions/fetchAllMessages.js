const mongoose = require("mongoose");
const Chat = mongoose.model("Chat");
const fetchAllMessages = async () => {
  try {
    const chatData = await Chat.find({}).sort({ createdAt: -1 });
    return chatData;
  } catch (err) {
    console.log(err);
  }
};

module.exports = fetchAllMessages;
