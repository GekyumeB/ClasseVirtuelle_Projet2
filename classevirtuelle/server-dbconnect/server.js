require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});

// Bring in the models
//require("./models/User");

//intégration socket.io
const express = require('express')
const app = express()
const server = require('http').createServer(app)

const io = require("socket.io")(server, { cors: { origin: "*"} });

io.on("connection", (socket) => {
  console.log('conneté au serveur acev succès (o_o)');
  console.log("utilisateur connecté : " + socket.id);

  socket.on('message', (data) => {
    console.log('Message reçcu sur le server : ', data)
    io.emit('message', data)     
  });  
});

server.listen(8080, () =>{
  console.log('le serveur est en ecoute sur le port 8080 et est en cours d\'execution...');
});
