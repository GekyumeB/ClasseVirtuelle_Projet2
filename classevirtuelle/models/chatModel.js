const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
    maxLength: [30, "Your room name cannot exceed 30 characters"],
  },
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    required: true
  },
  text: { 
    type: String, 
    maxlength: [250, 'Your message name cannot exceed 250 characters'], 
    required: true 
  },
  time: { 
    type: Date 
  }
});

/*
username,
    avatarUrl,
    text,
    time: moment().format('h:mm a')
*/

module.exports = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
