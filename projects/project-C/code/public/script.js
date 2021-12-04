let socket = io();
// let socket = io({ transports: ["websocket"], upgrade: false });

// var character = document.querySelector(".character");
let map = document.querySelector(".map");
let pixelSize = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue("--pixel-size")
);

let x = 90;
let y = 34;
let held_directions = []; //State of which arrow keys we are holding down
let speed = 1; //How fast the character moves in pixels per frame
let numOfUsers = 0;
let users = [];
let lastKey;
socket.on("singleId", function (msg) {
  console.log("My ID:", msg.value);
  myId = msg.value;
});

socket.on("updatedClients", function (msg) {
  console.log(msg.length);
  numOfUsers = parseInt(msg.length);
  console.log(numOfUsers);
  console.log("updatedClients", msg);
});
socket.on("addUser", (msg) => {
  //creating new character for new user
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
  newplayer.append(
    newplayerShadow,
    newplayerCollisionDetector,
    newplayerSprite
  );
  // newplayer.style.transform = `translate3d( ${x*pixelSize+msg.x}px, ${y*pixelSize+msg.y}px, 0 )`;
  map.appendChild(newplayer);
  users.push(newplayer);
  console.log(newplayer);
  console.log(msg);
  console.log(users);
  // placeCharacter(posX,posY,newplayer);
  // thisPlayer
  console.log(newplayer);
  // step();
  placeCharacter(msg.x, msg.y, msg.id);
  // socket.emit('move', msg);
});
socket.on("removeUser", (msg) => {
  console.log("removed");
  console.log(msg.id);
  users.find((x) => x.id === msg.id).remove();
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
    let held_direction = held_directions[0];
    if (held_direction) {
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
      // console.log(document.getElementById(player));
      users
        .find((x) => x.id === playerId)
        .setAttribute("facing", held_direction);

      // socket.emit('move', {x:posX,y:posY,id:playerId});
    }
    users
      .find((x) => x.id === playerId)
      .setAttribute("walking", held_direction ? "true" : "false");

    //Limits (gives the illusion of walls)
    var leftLimit = -8;
    var rightLimit = 16 * 11 + 8;
    var topLimit = -8 + 32;
    var bottomLimit = 16 * 7;
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
    map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${
      -y * pixelSize + camera_top
    }px, 0 )`;
    users.find((x) => x.id === playerId).style.transform = `translate3d( ${
      x * pixelSize + posX
    }px, ${y * pixelSize + posY}px, 0 )`;
    socket.emit("move", {
      x: x * pixelSize + posX,
      y: y * pixelSize + posY,
      id: playerId,
      direction: lastKey,
    });
  }
};

//Set up the game loop
const step = (posX, posY, player) => {
  // socket.emit('move', {x:posX,y:posY,id:player});
  // console.log(player);
  // socket.emit('move', msg);
  // console.log(msg.id + " emit move");
  document.getElementById("date").innerHTML = new Date().toLocaleTimeString();
  moveCharacters(posX, posY, player);
  thisPlayer = users.find((x) => x.id === player);
  for (let i = 0; i < users.length; i++) {
    if (thisPlayer != users[i])
      if (checkOverlap(
        thisPlayer.getElementsByClassName("collisionDetector")[0],
        users[i].getElementsByClassName("collisionDetector")[0]
      )){
        break
      }
  }
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

/* BONUS! Dpad functionality for mouse and touch */
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
  return(
    (
      aRect.top + aRect.height < bRect.top ||
      aRect.top > bRect.top + bRect.height ||
      aRect.left + aRect.width < bRect.left ||
      aRect.left > bRect.left + bRect.width
    )
  );
}
