// server.js
const express = require("express");
const next = require("next");
const socket = require("socket.io");
const moment = require('moment');

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

  // TODO : Ajouter les autres routes

  express_server.all("*", (req, res) => {
    return handle(req, res);
  });

  const server = express_server.listen(port, (err) => {
    if (err) throw err;
    console.log(`>> Ready on http://${hostname}:${port}`);
  });

  const botName = "Bot";
  const botImage = 'https://res.cloudinary.com/dhouw3lii/image/upload/v1650569520/ClasseVirtuelle/avatars/bot_anw0og.png'
  
  const io = socket(server, { cors: { origin: '*' } });

  io.on('connection', socket => {

    socket.on("joinRoom", async ({ userprofile, room }) => {
      
      const user = userJoin(socket.id, userprofile, room);
      
      const { chat } = await loadMsg(room)

        if (chat) {
          chat.map((c) =>{
            //console.log(c.room);
            //console.log(c.userId);
            //console.log(c.username)
            //console.log(c.avatarUrl)
            //console.log(c.time)
            socket.emit("message", formatMessage(c.userId, c.username, c.avatarUrl, c.time));
          })
        }
      //console.log('***/ load /***');
      //console.log(chat);
      //console.log(socket.id);
      //console.log(user);
      
      socket.join(user.room);

      // Welcome current user
      socket.emit("message", formatMessage(0, botName, botImage, "Welcome to ChatCord!", moment().format('h:mm a')));

      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          formatMessage(0, botName, botImage, `${user.userprofile.name} has joined the chat`, moment().format('h:mm a'))
        );

      // Send users and room info
      setInterval(() => {
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
      //console.log(users);
    }, 10000);
    });

    // Listen for chatMessage
    socket.on("chatMessage", async (msg) => {
      const user = getCurrentUser(socket.id);
      //console.log('server.js -68- MSG: '+msg);
      //console.log("*** USER ***");
      //console.log(user);
      const { newMsg } = await sendMsg(user.userprofile._id,  user.userprofile.name, user.userprofile.avatar.url, msg, user.room)
      
      //console.log(newMsg);

      if(newMsg){
        io.to(user.room).emit("message", formatMessage(newMsg.userId, newMsg.username, newMsg.avatarUrl, newMsg.text, newMsg.time));
      }
    else {
      console.log('Erreur');
    }

    });

    // Runs when client disconnects
     socket.on("disconnect", () => {
       const user = userLeave(socket.id);
   
       if (user) {
         io.to(user.room).emit(
           "message",
           formatMessage(0, botName, botImage, `${user.userprofile.name} has left the chat`, moment().format('h:mm a'))
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