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

const app = require("./app");

//intégration socket.io

const { createServer } = require("http");
const { Server } = require("socket.io");  
const httpServer = createServer(app);
const io = new Server(httpServer, {  });  
const ent = require('ent');


  io.on("connection", (socket) => {
	  console.log('connexion serveur');
      console.log(socket.id);
	 
    socket.on('nouvel_utilisateur', function(pseudo) {
	  console.log('New user : '+pseudo);
      pseudo = ent.encode(pseudo);
      socket.pseudo = pseudo; 
      socket.broadcast.emit('nouvel_utilisateur', pseudo);
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
	  console.log('message : ');
      message = ent.encode(message);
      console.log(message);
	console.log('de l\'utilisateur');
      socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    });
  
    socket.on('déconnexion', function(pseudo) {
    pseudo = ent.encode(pseudo);
    socket.pseudo = pseudo;
    socket.broadcast.emit(pseudo, 'déconnecté');
    });	
	  
 });

//app.listen a été remplacé par httpServer.listen (comme indiqué sur le site socket.io)
httpServer.listen(8080, () => {
  console.log("Server listenting on port 8080");
});
