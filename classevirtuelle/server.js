// server.js
const express = require("express");
const next = require("next");
const socket = require("socket.io");

require("dotenv").config({ path: "./.env" });

const port = 3000;
const hostname = "localhost";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const express_server = express();

  express_server.get("/", (req, res) => {
    return app.render(req, res, "/login");
  });

  // TODO : Ajouter les autres routes

  express_server.all("*", (req, res) => {
    return handle(req, res);
  });

  const server = express_server.listen(port, (err) => {
    if (err) throw err;
    console.log(`>> Ready on http://${hostname}:${port}`);
  });

  const io = socket(server, { cors:{ origin:'*' }});

  io.on("connection", (socket) => {
    console.log("Socket Ready");

    socket.on("message", (data) => {      
      console.log(data);
      io.emit("message", data);
    });
  });
});