let start = document.getElementById('start');
let stop = document.getElementById('stop');
let laps = document.getElementById('laps');
let backgroundAudio = new Audio("./assets/cartoon-game-theme-loop-3.wav");
backgroundAudio.loop=true;
let audio = new Audio("./assets/ding.wav");
let myWindow="";let roads="";let cactus="";
let sw=screen.width;
let sh=screen.height;
let popupwidth = 24;
let popupheight = 24;
let x=0;
let y=sh;
let dinoLaps = 0 ;
console.log(parseInt(y));

start.addEventListener('click', ()=>{
  openRoad();
  openDino();
  start.style.display="none";
  stop.style.display="inline";
  console.log(myWindow.screenX);
  backgroundAudio.play();
  moveCactus();
})
stop.addEventListener('click', ()=>{
  myWindow.close();
  roads.close();
  // cactus.close();
  stop.style.display="none";
  start.style.display="inline";
  backgroundAudio.pause();
})
function openDino(){
  let specifications = "width="+popupwidth+",height="+popupheight+",left="+x+",top="+(y-300);
  myWindow = window.open("dino", "", specifications);
}
function openRoad(){
  let roadSpecifications = "width="+sw+",height="+popupheight+",left="+x+",top="+y;
  roads = window.open("road", "", roadSpecifications);
}
function openCactus(){
  let cactusSpecifications = "left="+x+",top="+y;
  cactus = window.open("cactus", "", cactusSpecifications);
}
function moveCactus(){
  setInterval(
    () => {
      myWindow.moveBy(10,0);
      if (myWindow.screenX > 1200){
        myWindow.close();
        dinoLaps +=1;
        audio.play();
        laps.innerHTML = "dino laps: "+ dinoLaps;
        openDino();
      }
    },
    100
  );
}
console.log(myWindow.screenX);
if (myWindow.screenX > 540){
  myWindow.close();
}
