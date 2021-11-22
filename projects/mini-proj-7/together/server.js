const express = require('express')
const app = express()
const port = 3000
let http = require('http').createServer(app);
let io = require("socket.io")(http);

app.use(express.static('public'));


let connected = [];


// this event will be fired when a client
// connects via socket
io.on('connection', (socket) => {
  // all we want to do with the client, we need to do in here.
  console.log('a user connected', socket.id);
  socket.emit('singleId', {value: socket.id})

  connected.push(socket.id);
  // console.log(connected)
  connected.forEach(id=>{
    let copy = [...connected];
    io.to(id).emit("updatedClients", {value: copy.filter(otherid=>otherid!=id)});
  })


  // text
  socket.on('textToAllButMe', (msg) => {
    socket.broadcast.emit("text", {from: socket.id, value: msg.value});
  });
  socket.on('textToAll', (msg) => {
    io.emit("text", {from: socket.id, name: msg.name,choosenColor:msg.choosenColor});
  });
  socket.on('textToSingle', (msg) => {
    let id = msg.id;
    io.to(id).emit("text", {from: socket.id, value: msg.value});
  });

  socket.on('sendToAll', (msg) => {
    io.emit("send", {from: socket.id, name: msg.name,choosenColor:msg.choosenColor});
  });


  // single value
  socket.on('valueToAllButMe', (msg) => {
    socket.broadcast.emit("value", {from: socket.id});
  });
  socket.on('valueToAll', (msg) => {
    io.emit("value", {from: socket.id});
  });
  socket.on('valueToSingle', (msg) => {
    let id = msg.id;
    io.to(id).emit("value", {from: socket.id});
  });


  socket.on('disconnect', () => {
    // console.log('user disconnected', socket.id);
    let idx = connected.findIndex(socket.id)
    connected.splice(idx, 1);
    // console.log(connected)
    connected.forEach(id=>{
      let copy = [...connected];
      io.to(id).emit("updatedClients", {value: copy.filter(otherid=>otherid!=id)});
    })

  });


});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
