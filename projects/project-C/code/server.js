let express = require('express')
let app = express()
let port = 3000
let http = require('http').createServer(app);
let io = require("socket.io")(http);

let connectedUsers = [];

app.use(express.static('public'));

class Users{
  constructor(socket){
    // this.posX=[Math.random() * 100,Math.random() * 100];
    this.x = Math.random() * 100;
    this.y = Math.random() * 100;
    this.direction="down";
    this.color=(Math.floor(Math.random() * 360) + 1);
    this.socket = socket;

    this.socket.emit('addUser', {x:this.x,y:this.y,id:this.socket.id,color:this.color});
    for (let i=0;i<connectedUsers.length;i++){
      connectedUsers[i].socket.emit('addUser',{x:this.x,y:this.y,id:this.socket.id,color:this.color});
      this.socket.emit('addUser',{x:connectedUsers[i].x,y:connectedUsers[i].y,id:connectedUsers[i].socket.id,color:connectedUsers[i].color});
    }

    this.socket.on('move', (msg) => {
      // console.log("moving");
      this.x=msg.x;
      this.y=msg.y;
      this.direction=msg.direction;
      this.movement();
    });
    this.movement();

    this.socket.on("message", (data)=>{
      console.log(data);
      this.socket.emit("incoming",data);
      for (let i=0;i<connectedUsers.length;i++){
        connectedUsers[i].socket.emit('incoming',data);
        this.socket.emit('incoming',data);
      }
    });
    // this.socket.emit("incoming",data);
  }

  movement(){
    this.socket.emit('move', {x:this.x,y:this.y,id:this.socket.id,direction:this.direction});
    for (let i=0;i<connectedUsers.length;i++){
      connectedUsers[i].socket.emit('move',{x:this.x,y:this.y,id:this.socket.id,direction:this.direction});
      this.socket.emit('move',{x:connectedUsers[i].x,y:connectedUsers[i].y,id:connectedUsers[i].socket.id,direction:connectedUsers[i].direction});
    }
  }
}
io.on('connection', (socket) => {
  // all we want to do with the client, we need to do in here.
  console.log('a user connected', socket.id);
  socket.emit('singleId', {value: socket.id})
  //
  // connectedUsers[socket.id] = socket;
  connectedUsers.push(new Users(socket));
  // console.log(connectedUsers);
  // let x = Math.random() * 100;
  // let y = Math.random() * 100;
  // socket.emit('pos',{x:x, y:y});
  // connectedUsers.forEach(=>{
  //   let copy = [...connectedUsers];
  //   console.log(copy);
  //   // io.to(object).emit("updatedClients", {value: copy.filter(otherid=>otherid!=id)});
  // })
  const entries = Object.entries(connectedUsers);
  console.log(entries.length);
  socket.emit("updatedClients", {length: entries.length});

  // socket.on('move', (msg) => {
  //   // console.log("moving");
  //   io.emit('move', msg);
  // });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    let idx = connectedUsers.indexOf(socket.id);
    // socket.emit('removeUser',{index:idx});
    connectedUsers.forEach(id=>{
      // let copy = [...connectedUsers];
      io.emit("removeUser",{id:socket.id})
      // io.to(id).emit("updatedClients", {value: copy.filter(otherid=>otherid!=id)});
      // socket.emit('removeUser',{id});
    })
    connectedUsers.splice(idx, 1);
    const entries = Object.entries(connectedUsers);
    console.log(entries.length);
    io.emit("updatedClients", {length: entries.length});
    // console.log(connectedUsers);
    // delete connectedUsers[socket.id];
    // console.log(connectedUsers);

  });
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
