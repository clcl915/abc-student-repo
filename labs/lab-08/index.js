const express = require('express');
const app = express(); //make a thing to receive the requests handles routes
const http = require('http'); //knows how to talk http protocol
const server = http.createServer(app); //creates server and tell it to delegate route handling to express
const { Server } = require("socket.io"); //knows how to speak socket
const io = new Server(server); //creates socket that builds on top of

app.use(express.static("public"));

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
server.listen(3000, () => {
  console.log('listening on *:3000');
});
