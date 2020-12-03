const mongoose = require("mongoose");
const _ = require("lodash");
const Cryptr = require("cryptr");
const KEY = require("../constants/key");
const cryptr = new Cryptr(KEY);

const chatSchema = new mongoose.Schema({
  text: String,
  user: {
    _id: Number,
  },
  _id: String,
  createdAt: String,
});

chatSchema.pre("save", function () {
  console.log("Inside the pre function");
  const Chat = this;
  Chat.text = cryptr.encrypt(Chat.text);
});

chatSchema.post("find", function (docs) {
  _.map(docs, (data) => {
    data.text = cryptr.decrypt(data.text);
    return data;
  });
});

mongoose.model("Chat", chatSchema);
