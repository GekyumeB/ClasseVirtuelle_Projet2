const ChatModel = require("../models/chatModel");

const users = [];

// Join user to chat
const userJoin = (id, userprofile, room) => {
  const user = { id, userprofile, room };

  const isExist = users.find((u) => u.userprofile._id === user.userprofile._id);

  if (!isExist) {
    users.push(user);
  }

  return user;
}

// Get current user
const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
}

// User leaves chat
const userLeave = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room);
}

const sendMsg = async (userId, username, avatarUrl, message, roomName) => {
  try {
    const newMsg = {
      userId,
      username,
      avatarUrl,
      text: message,
      time: Date.now()
    }
    await ChatModel.create({
      room: roomName,
      messages: [
        {
          userId: userId,
          username: username,
          avatarUrl: avatarUrl,
          text: message,
          time: Date.now(),
        }
      ]
    })

    return { newMsg }
  } catch (error) {
    console.log(error);
    return { error }
  }
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  sendMsg,
};
