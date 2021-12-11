let socket = io();
// let socket = io({ transports: ["websocket"], upgrade: false });
let map = document.querySelector(".map");
let chatInput = document.querySelector(".chatInput");
let messagebox = document.querySelector("#message");
let textEnter = document.querySelector("#send");
let userText;
let pixelSize = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue("--pixel-size")
);
let myId;
let x = 90;
let y = 34;
let held_directions = []; //State of which arrow keys we are holding down
let speed = 1; //How fast the character moves in pixels per frame
let numOfUsers = 0;
let users = [];
let lastKey;
let collision = false;
let pressedDirection='';

socket.on("singleId", function (msg) {
  console.log("My ID:", msg.value);
  myId = msg.value;
});
let myUser= users.find((x) => x.id === myId);

document.getElementsByClassName('startButton')[0].addEventListener("click",()=>{
  document.querySelector(".gameStart > img").src = "assets/name.png";
  document.getElementsByClassName('startButton')[0].style.display= "none";
  document.getElementsByClassName('goButton')[0].style.display= "block";
  document.querySelector(".gameStartInput").style.display= "block";
});
document.getElementsByClassName('goButton')[0].addEventListener("click",()=>{
  let input = document.querySelector(".gameStartInput").value;
  console.log(input);
  socket.emit("name", {id:myId,name:input});
  document.getElementsByClassName('gameStart')[0].style.display= "none";
});
document.getElementsByClassName('gameStart')[0].addEventListener("keyup",(event)=>{
  if (event.keyCode===13){
    document.getElementsByClassName('goButton')[0].click();
  }
})
document.getElementsByClassName('info')[0].addEventListener("click",()=>{
  if (document.querySelector(".info > p").style.display == "none")
    document.querySelector(".info > p").style.display= "block";
  else
        document.querySelector(".info > p").style.display= "none";

});
socket.on("updatedClients", function (msg) {
  console.log(msg.length);
  numOfUsers = parseInt(msg.length);
  console.log(numOfUsers);
  console.log("updatedClients", msg);
});
socket.on("addUser", (msg) => {
  //creating new character for each new user
  console.log(msg.id);
  console.log("new player");
  let newplayer = document.createElement("div");
    newplayer.classList.add("character");
    newplayer.id = msg.id;
    newplayer.setAttribute("facing", "down");
    newplayer.setAttribute("walking", "false");
  let newplayerShadow = document.createElement("div");
    newplayerShadow.classList.add("shadow");
    newplayerShadow.classList.add("pixel-art");
  let newplayerCollisionDetector = document.createElement("div");
    newplayerCollisionDetector.classList.add("collisionDetector");
  let newplayerSprite = document.createElement("div");
    newplayerSprite.classList.add("character_spritesheet");
    newplayerSprite.style.setProperty("--colorAngle", "" + msg.color + "deg");
    newplayerSprite.classList.add("pixel-art");
  let newplayerText = document.createElement("div");
    newplayerText.classList.add("userText");
    let innerText = document.createElement("p");
    innerText.innerHTML = msg.name;
    innerText.classList.add("text");
    newplayerText.appendChild(innerText);
  newplayer.append(
    newplayerShadow,
    newplayerCollisionDetector,
    newplayerSprite,
    newplayerText
  );
  map.appendChild(newplayer);
  users.push(newplayer);
  placeCharacter(msg.x, msg.y, msg.id);
});
socket.on("addname",(msg) =>{
  users.find((x) => x.id === msg.id).getElementsByClassName("text")[0].innerHTML = msg.name;
  users.find((x) => x.id === msg.id).name = msg.name;
})
socket.on("removeUser", (msg) => {
  console.log(msg.id);
  users.find((x) => x.id === msg.id).remove();
  console.log("removed");

});

const placeCharacter = (posX, posY, playerId) => {
  users.find((x) => x.id === playerId).style.transform = `translate3d( ${
    x * pixelSize + posX
  }px, ${y * pixelSize + posY}px, 0 )`;
  step(posX, posY, playerId);
};
const moveCharacters = (posX, posY, playerId) => {
  // console.log(player);
  // player = document.getElementById(''+playerId+'');
  pixelSize = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--pixel-size")
  );
  // console.log(users);
  if (playerId === myId) {
    thisPlayer = users.find((x) => x.id === playerId);
    userText=thisPlayer.getElementsByClassName('userText')[0];
    let lastFace = thisPlayer.getAttribute("facing");
    let lastX= x;
    let lastY=y;
    let held_direction = held_directions[0];
    if (held_direction) {
      pressedDirection = held_direction;
      if (held_direction === directions.right) {
        x += speed;
      }
      if (held_direction === directions.left) {
        x -= speed;
      }
      if (held_direction === directions.down) {
        y += speed;
      }
      if (held_direction === directions.up) {
        y -= speed;
      }
      users
        .find((x) => x.id === playerId)
        .setAttribute("facing", held_direction);
  }
    for (let i = 0; i < users.length; i++) {
      if (thisPlayer != users[i]){
        if (!checkOverlap(
          thisPlayer.getElementsByClassName("collisionDetector")[0],
          users[i].getElementsByClassName("collisionDetector")[0]
        )){
          if (pressedDirection!=lastFace){
            collision = false;
            chatInput.style.display = "none";
          }
          else{
            x=lastX;
            y=lastY;
            collision = true;
            chatInput.style.display = "block";
          }
          console.log(collision);
          break
        }
      }
    }

    users
      .find((x) => x.id === playerId)
      .setAttribute("walking", held_direction ? "true" : "false");

    //Limits (gives the illusion of walls)
    var leftLimit = -8;
    var rightLimit = 16 * 17 + 8;
    var topLimit = 0;
    var bottomLimit = 16 * 12;
    if (x < leftLimit) {
      x = leftLimit;
    }
    if (x > rightLimit) {
      x = rightLimit;
    }
    if (y < topLimit) {
      y = topLimit;
    }
    if (y > bottomLimit) {
      y = bottomLimit;
    }

    var camera_left = pixelSize * 66;
    var camera_top = pixelSize * 42;
    // console.log(collision);
    if ((!collision)){
      map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${
        -y * pixelSize + camera_top
      }px, 0 )`;
      users.find((x) => x.id === playerId).style.transform = `translate3d( ${
        x * pixelSize + posX
      }px, ${y * pixelSize + posY}px, 0 )`;
    }

    socket.emit("move", {
      x: x * pixelSize + posX,
      y: y * pixelSize + posY,
      id: playerId,
      direction: lastKey,
    });
  }
};

//Game Loop with requestAnimationFrame
const step = (posX, posY, player) => {
  document.getElementById("date").innerHTML = new Date().toLocaleTimeString();
  moveCharacters(posX, posY, player);
  window.requestAnimationFrame(() => {
    step(posX, posY, player);
  });
};

socket.on("move", (msg) => {
  if (msg.id != myId) {
    users.find(
      (x) => x.id === msg.id
    ).style.transform = `translate3d( ${msg.x}px, ${msg.y}px, 0 )`;
    users.find((x) => x.id === msg.id).setAttribute("facing", msg.direction);
  }
});

/* Direction key state */
const directions = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
};
const keys = {
  38: directions.up,
  37: directions.left,
  39: directions.right,
  40: directions.down,
};
document.addEventListener("keydown", (e) => {
  var dir = keys[e.which];
  if (dir && held_directions.indexOf(dir) === -1) {
    held_directions.unshift(dir);
  }
});

document.addEventListener("keyup", (e) => {
  var dir = keys[e.which];
  var index = held_directions.indexOf(dir);
  if (index > -1) {
    lastKey = held_directions[index];
    held_directions.splice(index, 1);
  }
});

/* Dpad functionality for mouse and touch */
var isPressed = false;
const removePressedAll = () => {
  document.querySelectorAll(".dpad-button").forEach((d) => {
    d.classList.remove("pressed");
  });
};
document.body.addEventListener("mousedown", () => {
  console.log("mouse is down");
  isPressed = true;
});
document.body.addEventListener("mouseup", () => {
  console.log("mouse is up");
  isPressed = false;
  held_directions = [];
  removePressedAll();
});
const handleDpadPress = (direction, click) => {
  if (click) {
    isPressed = true;
  }
  held_directions = isPressed ? [direction] : [];

  if (isPressed) {
    removePressedAll();
    document.querySelector(".dpad-" + direction).classList.add("pressed");
  }
};
//Bind a ton of events for the dpad
document
  .querySelector(".dpad-left")
  .addEventListener("touchstart", (e) =>
    handleDpadPress(directions.left, true)
  );
document
  .querySelector(".dpad-up")
  .addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document
  .querySelector(".dpad-right")
  .addEventListener("touchstart", (e) =>
    handleDpadPress(directions.right, true)
  );
document
  .querySelector(".dpad-down")
  .addEventListener("touchstart", (e) =>
    handleDpadPress(directions.down, true)
  );

document
  .querySelector(".dpad-left")
  .addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document
  .querySelector(".dpad-up")
  .addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document
  .querySelector(".dpad-right")
  .addEventListener("mousedown", (e) =>
    handleDpadPress(directions.right, true)
  );
document
  .querySelector(".dpad-down")
  .addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

document
  .querySelector(".dpad-left")
  .addEventListener("mouseover", (e) => handleDpadPress(directions.left));
document
  .querySelector(".dpad-up")
  .addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document
  .querySelector(".dpad-right")
  .addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document
  .querySelector(".dpad-down")
  .addEventListener("mouseover", (e) => handleDpadPress(directions.down));

/* Check Character Collisions */
// Source: https://stackoverflow.com/questions/2440377/javascript-collision-detection
function checkOverlap(a, b) {
  var aRect = a.getBoundingClientRect();
  var bRect = b.getBoundingClientRect();
  // console.log(aRect.top + aRect.height + " and " + bRect.top)
  return(
    ((aRect.top + aRect.height) < (bRect.top)) ||
     (aRect.top > (bRect.top + bRect.height)) ||
     ((aRect.left + aRect.width) < bRect.left) ||
     (aRect.left > (bRect.left + bRect.width))
  );
}
// console.log(userText);
textEnter.addEventListener("click", ()=>{
  console.log("entered text");
  let message=messagebox.value.trim();
  console.log(message);
  if (message!=""){
    socket.emit('message', {id:myId,message:message});
  };
  messagebox.value ="";
});
messagebox.addEventListener("keyup",(event)=>{
  if (event.keyCode===13){
    textEnter.click();
  }
})
socket.on("incoming",(data)=>{
  console.log(data);
  let message=data.message;
  let user = users.find((x) => x.id === data.id)
  user.getElementsByClassName("text")[0].innerHTML = message;
  setTimeout(
    function() {
      user.getElementsByClassName("text")[0].innerHTML = user.name;
    }, 5000);
})
