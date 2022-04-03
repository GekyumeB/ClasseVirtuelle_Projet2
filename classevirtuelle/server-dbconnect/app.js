const express = require("express");
const app = express();


//test socket.io
// Chargement de la page index.html
app.get('/', function (req, res) {
	console.log('ROUTE GET');
  res.sendFile(__dirname + '/index.html');
   
});

// Chargement de la page client.html
app.get('/client', function (req, res) {
  res.sendFile(__dirname + '/client.html');
});  //fin tests pour socket.io


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Bring in the routes

/*const userRoutes = require('./routes/user');

//app.use("/user", require("./routes/user"));
  app.use('/api/user',userRoutes);  */

// Setup Error Handlers
const errorHandlers = require("../handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);

if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}



module.exports = app;
