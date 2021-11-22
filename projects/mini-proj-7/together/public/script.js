let socket = io();
let others = [];
let colorgradientArray = ['--color-1','--color-2','--color-3','--color-4'];
let myId;
let testMode = false;
let numofUsers=0;
let numCountText= document.getElementById('numCountText');

//receiveMyId
socket.on('singleId', function(msg) {
  console.log("My ID:", msg.value)
  myId = msg.value
});
// here I receive updated whenever someone disconnects or connects to the socket server.
socket.on('updatedClients', function(msg) {
  console.log(msg.value.length)
  if (parseInt(numofUsers) >3){
    console.log("different room");
    socket.emit('joinroom', room2);
  }
  console.log("updatedClients", msg)
  others = msg.value
  console.log(msg.value.length)
  numCountText.innerHTML = msg.value.length
  numofUsers = msg.value.length

});

// --------
let container= document.getElementsByClassName('container')[0];
let wrapper = document.getElementsByClassName('wrapper')[0];
let namebox= document.getElementById('name');
let userColor= document.getElementById('userColor');
let all = document.getElementById("all");
let allbutme = document.getElementById("allbutme");
let randomSingle = document.getElementById("randomSingle");
let submitUser = document.getElementById("submitUser");
let root = document.querySelector(':root');
console.log("root is",root);
let buttonOutput = document.getElementById("buttonOutput");

submitUser.addEventListener("click", ()=>{
  console.log("clicked");
  let name=namebox.value.trim();
  console.log("name is: " , name );
  if (name==""){
    name="anonymous";
    console.log("name is: " , name );
    namebox.value ="";
  };
  let choosenColor=userColor.value.trim();
  console.log(choosenColor);
  if (choosenColor!=""){
    let data={name:name,choosenColor:choosenColor};
    console.log("please click on my blob");
    socket.emit('sendToAll', {name:name,choosenColor:choosenColor});
    // makeblob(choosenColor);
    console.log(data);
    wrapper.style.display = "none";
  };
});

socket.on('send', function(msg){
  if(testMode && msg.from != myId){return}
  console.log(msg);
  console.log(msg.name);
  makeblob(msg.choosenColor);
  changeBkgColors(msg);
});

function makeblob(msg){
  console.log("this is working?");
  console.log(msg);
  // if (testMode && msg.from !=myId){return}
  // console.log(msg.name);
  let x= Math.random()*window.innerWidth;
  let y= Math.random()*window.innerHeight;
  let div = document.createElement('div');
  div.className='colorBlob';
  div.style.left=x +'px';
  div.style.top=y +'px';
  // div.style.backgroundColor = msg.choosenColor;
  container.appendChild(div);
}

let textInput = document.getElementById("textinput");
let textsubmit =document.getElementById('sendText');
let textBox =document.getElementById('textBox');
let whichUser =document.getElementById('whichUser');
let inputtedcolor =document.getElementById('inputtedcolor');

textsubmit.addEventListener("click",()=>{
  let textToSend=textinput.value;
  textInput.value='';
  console.log(textToSend);
  if(textToSend !=''){
    socket.emit('textToAll',{choosenColor:textToSend});
    // root.style.setProperty('--color-1', textToSend);
  }
});

socket.on('text',function(msg){
  if (testMode && msg.from !=myId){return}
  changeBkgColors(msg);
});

function changeBkgColors(msg){
  console.log(msg);
  var colorSpot = colorgradientArray[Math.floor(Math.random()*colorgradientArray.length)];
  root.style.setProperty(colorSpot, msg.choosenColor);
  let x= Math.random()*window.innerWidth;
  let y= Math.random()*window.innerHeight;
  // let span =document.createElement('span');
  if (msg.name){
    whichUser.className='textMessage';
    whichUser.innerHTML = msg.name;
    inputtedcolor.className='textMessage';
    inputtedcolor.innerHTML = msg.choosenColor;
  }
  else{
    inputtedcolor.className='textMessage';
    inputtedcolor.innerHTML = msg.choosenColor;
  }

  // textBox.appendChild(span);
}
