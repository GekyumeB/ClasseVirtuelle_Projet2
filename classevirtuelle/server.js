// server.js
const express = require("express");
const next = require("next");
const socket = require("socket.io");

const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users')

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

  // TODO : Ajouter les autres routes

  express_server.all("*", (req, res) => {
    return handle(req, res);
  });

  const server = express_server.listen(port, (err) => {
    if (err) throw err;
    console.log(`>> Ready on http://${hostname}:${port}`);
  });

  const botName = "Bot";
  const io = socket(server, { cors: { origin: '*' } });

  io.on('connection', socket => {

    socket.on("joinRoom", ({ userprofile, room }) => {
      
      const user = userJoin(socket.id, userprofile, room);
      
      //console.log(socket.id);
      //console.log(user);
      
      socket.join(user.room);

      // Welcome current user
      socket.emit("message", formatMessage(botName, '', "Welcome to ChatCord!"));

      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          formatMessage(botName, '', `${user.userprofile.name} has joined the chat`)
        );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
      //console.log(users);
    });

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
      const user = getCurrentUser(socket.id);
      //console.log('server.js -68- MSG: '+msg);
      console.log("*** USER ***");
      console.log(user);
      io.to(user.room).emit("message", formatMessage(user.userprofile.name, user.userprofile.avatar.url, msg));
    });

    // Runs when client disconnects
     socket.on("disconnect", () => {
       const user = userLeave(socket.id);
   
       if (user) {
         io.to(user.room).emit(
           "message",
           formatMessage(botName, '', `${user.userprofile.name} has left the chat`)
         );
   
         // Send users and room info
         io.to(user.room).emit("roomUsers", {
           room: user.room,
           users: getRoomUsers(user.room),
         });
       }
     });




    //******************************************************** */
    /* io.on("connection", (socket) => {
       console.log("Socket Ready");
   
       socket.on("message", (data) => {      
         console.log(data);
         io.emit("message", data);
       });*/
  });
});