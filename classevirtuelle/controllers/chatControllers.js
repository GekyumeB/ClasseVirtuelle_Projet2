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
    const room = await ChatModel.findOne({ room: roomName })

    console.log('*** ROOM ***');
    console.log(room);

    const newMsg = {
      userId,
      username,
      avatarUrl,
      text: message,
      time: Date.now()
    }

    console.log('*** NEWMSG ***');
    console.log(newMsg);

/*
const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

*/
    if (room === null) {
      console.log('*** IF ROOM ***');
      
      const room = await ChatModel.create({
        room: roomName,
        messages: [
          {
            userId: newMsg.userId,
            username: newMsg.username,
            avatarUrl: newMsg.avatarUrl,
            text: newMsg.text,
            time: Date.now(),
          }
        ]
      })

      console.log('*** ROOM CREATE ***');
      console.log(room);
    }
    //
    else {
      console.log('**** ELSE IF ROON ***');
      //const newRoom = { room: roomName, message: [newMsg] }
      //room.message.unshift(newRoom)

      room.message.push(newMsg)

      console.log('*** APRES PUSH ***');
      console.log(room);
      await room.save()
    }

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
