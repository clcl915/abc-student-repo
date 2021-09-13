console.log("im here");
let button= document.getElementById('button');
let myWindow;
let sw=screen.width;
let sh=screen.height;
let popupwidth=200;
let popupheight=200;
console.log("sw", sw);
function openWindow(){
    let x=Math.random()*(sw-popupwidth);
    let y=Math.random()*(sh-popupheight);
    let specifications = "width="+popupwidth+",height="+popupheight+",left="+x+",top="+y;
    let ranTime= 1000 + Math.random()*1000;
    myWindow = window.open("window", "", specifications);
    myWindow.addEventListener('load',()=>{
        setTimeout(()=>{myWindow.close();},ranTime);
    })


}
function openManyWindow(){
  for (let i=0;i<10;i++){
    openWindow();
  }
}
button.addEventListener("click", ()=>{
  openWindow();
})
