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

const sendMsg = async (userId, role, username, avatarUrl, message, roomName) => {
  try {
    const newMsg = {
      userId,
      role,
      username,
      avatarUrl,
      text: message,
      time: Date.now()
    }
    await ChatModel.create({
      room: roomName,
      userId: userId,
      role: role,
      username: username,
      avatarUrl: avatarUrl,
      text: message,
      time: Date.now(),
    })

    return { newMsg }
  } catch (error) {
    console.log(error);
    return { error }
  }
}

const loadMsg = async (roomName) => {
  try {
    const chat = await ChatModel.find({ room: roomName });

    if (!chat) {
      return { error: "No chat found" };
    }

    return { chat };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  sendMsg,
  loadMsg,
};
