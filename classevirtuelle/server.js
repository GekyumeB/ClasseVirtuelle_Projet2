// server.js
const express = require("express");
const next = require("next");
const socket = require("socket.io");


const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers, sendMsg, loadMsg } = require('./controllers/chatControllers')

require("dotenv").config({ path: "./.env" });

const port = 3000;
const hostname = "localhost";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const express_server = express();

  express_server.get("/", (req, res) => {
    return app.render(req, res, "/");
  });

  express_server.all("*", (req, res) => {
    return handle(req, res);
  });

  const server = express_server.listen(port, (err) => {
    if (err) throw err;
    console.log(`>> Ready on http://${hostname}:${port}`);
  });

  const io = socket(server, { cors: { origin: '*' } });

  io.on('connection', socket => {

    socket.on("joinRoom", async ({ userprofile, room }) => {

      // User is connected
      const user = userJoin(socket.id, userprofile, room);

      // Load database message
      const { chat } = await loadMsg(room)

      if (chat) {
        chat.map((c) => {
          socket.emit("message", formatMessage(c.userId, c.role, c.username, c.avatarUrl, c.text, c.time));
        })
      }

      socket.join(user.room);

      // Send users and room info
      setInterval(() => {
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }, 10000);
    });

    // Listen for chatMessage
    socket.on("chatMessage", async (msg) => {
      const user = getCurrentUser(socket.id);

      const { newMsg } = await sendMsg(user.userprofile._id, user.userprofile.role, user.userprofile.name, user.userprofile.avatar.url, msg, user.room)

      if (newMsg) {
        io.to(user.room).emit("message", formatMessage(newMsg.userId, newMsg.role, newMsg.username, newMsg.avatarUrl, newMsg.text, newMsg.time));
      }
      else {
        console.log('Error : fetch database information is impossible');
      }
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
      const user = userLeave(socket.id);

      if (user) {
        // Send users and room info
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  });
});