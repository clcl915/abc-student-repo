let socket = io("https://almondine-gusty-tulip.glitch.me");
let others = [];
let myId;
let testMode = false;

//receiveMyId
socket.on('singleId', function(msg) {
  console.log("My ID:", msg.value)
  myId = msg.value
});
// here I receive updated whenever someone disconnects or connects to the socket server.
socket.on('updatedClients', function(msg) {
  console.log("updatedClients", msg)
  others = msg.value
});

// --------


let all = document.getElementById("all");
let allbutme = document.getElementById("allbutme");
let randomSingle = document.getElementById("randomSingle");
let buttonOutput = document.getElementById("buttonOutput");

function buttonReceived(){
  buttonOutput.style.backgroundColor = "red";
  setTimeout(function(){
    buttonOutput.style.backgroundColor = "black";
  }, 500)
}

all.addEventListener("click", ()=>{
  console.log("click");
  socket.emit('button1ToAll');
})
allbutme.addEventListener("click", ()=>{
  console.log("click");
  socket.emit('button1ToAllButMe');
})
randomSingle.addEventListener("click", ()=>{
  if (others.length >0) {
    let ranFloat = Math.random()*others.length;
    let randIndx=Math.floor(ranFloat);
    let randomOtherId = others[randIndx];
    socket.emit('button1ToSingle',{id:randomOtherId})
  }
})

socket.on('button1', function(msg) {
  if(testMode && msg.from != myId){return}
  buttonReceived();
});


let textInput = document.getElementById("textinput");
let textsubmit =document.getElementById('sendText');
let textBox =document.getElementById('textBox');

textsubmit.addEventListener("click",()=>{
  let textToSend=textinput.value;
  textInput.value='';
  if(textToSend !=''){
    socket.emit('textToAllButMe',{value:textToSend});
  }
})

socket.on('text',function(msg){
  if (testMode && msg.from !=myId){return}

  console.log(msg.value);
  let x= Math.random()*window.innerWidth;
  let y= Math.random()*window.innerHeight;
  let p =document.createElement('p');
  p.className='textMessage';
  p.style.left=x +'px';
  p.style.top=y +'px';
  p.innerHTML = msg.value;
  textBox.appendChild(p);
})
