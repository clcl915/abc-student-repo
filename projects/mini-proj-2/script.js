let body = document.getElementsByTagName('body')[0];
let sw=screen.width;
let sh=screen.height;
let popupwidth=300;
let popupheight=300;
let showTime = document.getElementById('showTime');
let goodMessage= document.getElementById('goodMessage');
let showTimeZone=document.getElementById('selectTimeZone');
let shanghai= document.getElementById('Shanghai');
let newyork= document.getElementById('NY');
let reset= document.getElementById('reset');
let submit = document.getElementById('submit');
let place = "Shanghai";
let maingoal="";let remindMeIn;

setInterval(
  () => {
    let d = new Date();
    let chinaTime = d.toLocaleTimeString('en-US', { timeZone: 'Asia/Shanghai'});
    let chinaTimeInHours=parseInt(d.toLocaleTimeString('en-US', { timeZone: 'Asia/Shanghai',hour: '2-digit', hour12: false}),10);
    console.log(chinaTimeInHours);
    let newyorkTime = d.toLocaleTimeString('en-US', { timeZone: 'America/New_York'});
    let newyorkTimeInHours=parseInt(d.toLocaleTimeString('en-US', { timeZone: 'America/New_York',hour: '2-digit', hour12: false}),10);
    // console.log(newyorkTimeInHours);
    if (place == "New York"){
      showTime.innerHTML = newyorkTime;
      changeMessage(newyorkTimeInHours);
    }
    else{
      showTime.innerHTML = chinaTime;
      changeMessage(chinaTimeInHours);
    }
  },
  1000
);
function changeMessage(hours){
  if (hours >= 6 && hours <12){
    goodMessage.innerHTML = "Good morning!";
    body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.25),rgba(0, 0, 0, 0.25)),url('./assets/sky-background.png')";
    // console.log('daytime');
  }
  else if (hours >= 12 && hours <6){
    body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('./assets/sky-background.png')";
    goodMessage.innerHTML = "Good afternoon!";
  }
  else{
    goodMessage.innerHTML = "Good evening!";
    body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)),url('./assets/sky-background.png')";
    // console.log('nightime');
  }
}
function remindMe(){
  let x=Math.random()*(sw-popupwidth);
  let y=Math.random()*(sh-popupheight);
  let specifications = "width="+popupwidth+",height="+popupheight+",left="+x+",top="+y;
  let ranTime= 1000 + Math.random()*1000;
  let myWindow = window.open("", "", specifications);
  myWindow.document.write("<h1>"+maingoal+"</h1>");
  // myWindow.addEventListener('load',()=>{
  //     setTimeout(()=>{myWindow.close();},remindMeIn*1000);
  // })
}
newyork.addEventListener("click", ()=>{
  place = "New York";
  showTimeZone.style.display="none";
  document.getElementsByClassName('tasks')[0].style.display='block';

  shanghai.style.display='none';
  reset.style.display='block';
  // openMoon();
})
shanghai.addEventListener("click", ()=>{
  place = "Shanghai";
  showTimeZone.style.display="none";
  document.getElementsByClassName('tasks')[0].style.display='block';
  newyork.style.display='none';
  reset.style.display='block';
  // openSun();
})
reset.addEventListener("click", ()=>{
  showTimeZone.style.display="inline";
  document.getElementsByClassName('tasks')[0].style.display='none';

  shanghai.style.display="inline";
  newyork.style.display="inline";
  reset.style.display="none";
})
function openManyWindows(){
  for (let i=0;i<10;i++){
    setTimeout(remindMe,remindMeIn*60*1000);
  }
}
submit.addEventListener('click',()=>{
  maingoal = document.getElementById('task').value;
  remindMeIn = document.getElementById('remindMeIn').value;
  openManyWindows();
  document.getElementsByClassName('tasks')[0].style.display='none';
  document.getElementsByClassName('container')[0].innerHTML += "Ok! Your goal is received!";
})
