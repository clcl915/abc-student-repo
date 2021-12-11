function detectDevice(){
  //if user is on mobile
  if (!!navigator.maxTouchPoints){
    window.alert("This is best viewed on desktop! \n Please view this on a desktop device");
  }
  //if user is on desktop
  else{
  }
}
detectDevice()

let dino = document.querySelector("#dino");
let background = document.querySelector(".backgroundContainer");
let allProjDiv = document.querySelector(".projNames");
let welcome = document.querySelector(".welcome");
let mini1 = document.querySelector("#mini1");let mini2 = document.querySelector("#mini2");let mini3 = document.querySelector("#mini3");let mini4 = document.querySelector("#mini4");let mini5 = document.querySelector("#mini5");let mini6 = document.querySelector("#mini6");let mini7 = document.querySelector("#mini7");
let big1=document.querySelector("#big1");let big2=document.querySelector("#big2");let big3=document.querySelector("#big3");
let projArray = [mini1,mini2,mini3,big1,mini4,mini5,big2,mini6,mini7,big3];
let instructions=document.getElementsByClassName('instructions')[0];
let held_directions = []; //State of which arrow keys we are holding down
let speed = 4; //How fast the character moves in pixels per frame
let x = 100;
let go= false;
let last;

welcome.style.visibility="hidden";
for (let i=0;i<10;i++){
  projArray[i].style.visibility="hidden";
}
const moveCharacters = () => {
  var pixelSize = parseInt(
   getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
);
  const held_direction = held_directions[0];
     if (held_direction) {
        if (held_direction === directions.right) {x += speed;dino.style.transform = "scaleX(1)"}
        if (held_direction === directions.left) {x -= speed;dino.style.transform = "scaleX(-1)"}
     }

     // // Limits (gives the illusion of walls)
     var leftLimit = 90;
     var rightLimit = 2130;
     if (x < leftLimit) { x = leftLimit; }
     if (x > rightLimit) { x = rightLimit; }


     var camera_left = pixelSize * 66;
     var camera_top = pixelSize * 42;
     //
     // background.style.transform = `translate3d( ${15}px, ${15}px, 0 )`;
     // dino.style.transform = `translate3d( ${1}px, ${1}px, 0 )`;
     background.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, 0, 0 )`;
};
const step = (posX, posY, player) => {
  moveCharacters();
  checkOverlapWelcome(dino,welcome);
  for (let i=0;i<10;i++){
    checkOverlap(dino,projArray[i]);
    if (go == true){
      last = i;
    }
  }
  if (last){
    projArray[last].click();
  }
  window.requestAnimationFrame(() => {
    step(posX, posY, player);
  });
};
setTimeout(
    function() {
      instructions.style.visibility = "hidden";
    }, 5000);
step();
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
  dino.classList.add("dinoAnimation");
  var dir = keys[e.which];
  if (dir && held_directions.indexOf(dir) === -1) {
    held_directions.unshift(dir);
  }
});

document.addEventListener("keyup", (e) => {
    dino.classList.remove("dinoAnimation");
  var dir = keys[e.which];
  var index = held_directions.indexOf(dir);
  if (index > -1) {
    lastKey = held_directions[index];
    held_directions.splice(index, 1);
  }
});

function checkOverlap(a, b) {
  var aRect = a.getBoundingClientRect();
  var bRect = b.getBoundingClientRect();
  if (!(aRect.right < bRect.left - 20)){
    b.style.visibility = "visible";
    instructions.innerHTML = "Press the ENTER key to enter!"
    instructions.style.visibility = "visible";
    setTimeout(
        function() {instructions.style.visibility = "hidden";}, 5000);
    document.addEventListener("keydown", (e) => {
      var code = (e.keyCode ? e.keyCode : e.which);
      if(code == 13) {
        go = true;
      }
    });

  }
  else{
      b.style.visibility = "hidden";
      go=false;
  }
}

function checkOverlapWelcome(a,b){
  var aRect = a.getBoundingClientRect();
  var bRect = b.getBoundingClientRect();
  if (!(aRect.right < bRect.left)){
    b.style.visibility = "visible";
  }
  else{
      b.style.visibility = "hidden";
  }
}
