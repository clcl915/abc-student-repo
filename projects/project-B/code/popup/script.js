let pigoverlay = document.getElementsByClassName('pigoverlay')[0];
let house = document.getElementsByClassName('house')[0];
var port = chrome.extension.connect({
        name: "Sample Communication"
   });
   port.postMessage("Hi BackGround");
   port.onMessage.addListener(function(msg) {
     if (msg == 'farmsuccess'){
       console.log("farm success");
       pigoverlay.classList.remove("hidden");
     }
     else if (msg == 'gardensuccess'){
       console.log("garden success");
       block1.style.backgroundPosition = "right";
       block1.style.backgroundImage = "url('https://64.media.tumblr.com/5c36943adcece7769082d82863cb0e4e/9e54f617e5091267-a5/s500x750/ebc0ffc172c9ed79204b64f95b5814b34f5330a0.png')";
     }
     else if (msg == 'buildsuccess'){
       console.log("build success");
       house.classList.remove("hidden");
     }
        console.log("message recieved" + msg);
 });
let block1 = document.getElementsByClassName('1')[0];
let ontop = document.getElementsByClassName('ontop')[0];
let idle = document.getElementsByClassName('idle')[0];
let popupMessage = document.getElementById('popupMessage');
let next = document.getElementsByClassName('next')[0];
let confirmGame = document.getElementsByClassName('confirmGame')[0];
let yes = document.getElementsByClassName('yes')[0];
let no = document.getElementsByClassName('no')[0];
let messageCommands = document.getElementsByClassName('messageCommands')[0];
let selectTasks = document.getElementsByClassName('selectTasks')[0];
let charMessages = ["This is a space for you to build.", "We are your little helpers ready to help you.", "Your little helpers will do the work for you in the background.", "Your job is to just be PRODUCTIVE!", "All you have to do is decide to stay on one page, press on our chrome extension icon, and work!", "But, you can't change tabs or be idle for too long.","If you stop working, we stop working.","Choose a time frame for your work and we will get to work as well!","Are you ready?"];
let clicks = 0;
let runCharacterAnimation, showMessage;
let farm = document.getElementById('farm');
let garden = document.getElementById('garden');
let build = document.getElementById('build');

let message={type:"getStatus", keys: ["finishedIntro", "farmSuccess","gardenSuccess","buildSuccess"]};
chrome.runtime.onMessage.addListener(function(message, messageSender, sendResponse) {
  console.log(message);
  console.log("hi");
    if (message == 'farmsuccess'){
      console.log("farm success");
      block1.style.backgroundImage = "url('https://64.media.tumblr.com/5c36943adcece7769082d82863cb0e4e/9e54f617e5091267-a5/s500x750/ebc0ffc172c9ed79204b64f95b5814b34f5330a0.png')";
    }
});
chrome.runtime.sendMessage(message,(response)=>{
  console.log("background script");
  console.log("background script sent me this",response);
  if (response == false){
    introduction();
  }
  else{
    selectTask();
  }
});

// INTRODUCTION -> Show Intro Message
function introduction(){
  runCharacterAnimation = setInterval(()=>{
    console.log("walking");
    idle.className = 'characterWalking';
  },2500);

  showMessage = setInterval(()=>{
    clearInterval(runCharacterAnimation);
    popupMessage.classList.remove("hidden");
    next.classList.remove("hidden");
  },5500);

  next.addEventListener("click",()=>{
    clearInterval(showMessage);
    console.log("clicks is " + clicks);
    console.log("message is " + charMessages.length);
    if (clicks != (charMessages.length-1))
      popupMessage.innerHTML = charMessages[clicks];
    else{
      popupMessage.innerHTML = charMessages[clicks];
      confirmGame.classList.remove("hidden");
      yes.classList.remove("hidden");
      no.classList.remove("hidden");
      next.classList.add("hidden");
    }
    clicks ++;
  });

  yes.addEventListener("click",()=>{
    popupMessage.innerHTML = "Ok! Now, go to a site you want to be productive at. Click my icon again when you're done.";
    confirmGame.classList.add("hidden");
    yes.classList.add("hidden");
    no.classList.add("hidden");
    let message = {type: "finishedIntro"}
    chrome.runtime.sendMessage(message);
  });

  no.addEventListener("click",()=>{
    confirmGame.classList.add("hidden");
    popupMessage.innerHTML = ".... <br> Ok. Bye.";
    setInterval(()=>{window.close();},1500);
  });
}

function selectTask(){
  idle.className = 'characterWalking';
  showMessage = setInterval(()=>{
    popupMessage.classList.remove("hidden");
    popupMessage.innerHTML = "Ready to get to work on this site?";
    confirmGame.classList.remove("hidden");
    yes.classList.remove("hidden");
    no.classList.remove("hidden");
  },2500);

  yes.addEventListener("click",()=>{
    clearInterval(showMessage);
    popupMessage.innerHTML = "Ok! Select your task";
    popupMessage.style.top = 0;
    selectTasks.classList.remove("hidden");
    confirmGame.classList.add("hidden");
    yes.classList.add("hidden");
    no.classList.add("hidden");
  });
  no.addEventListener("click",()=>{
    popupMessage.innerHTML = "Ok. Come back when you're ready!";
    setInterval(()=>{window.close();},1500);
  });
  // select tasks 15m/30m/1hr
  farm.addEventListener("click",()=>{
    console.log("farm selected");
    let message = {type: "choseFarm"}
    chrome.runtime.sendMessage(message);
    selectTasks.classList.add("hidden");
    popupMessage.innerHTML = "Ok! Let's get to work! See you in 15 mins";
    popupMessage.style.top = "25%";
    setInterval(()=>{window.close();},2500);
  });
  garden.addEventListener("click",()=>{
    console.log("garden selected");
    let message = {type: "choseGarden"}
    chrome.runtime.sendMessage(message);
    selectTasks.classList.add("hidden");
    popupMessage.innerHTML = "Ok! Let's get to work! See you in 30 mins";
    popupMessage.style.top = "25%";
    setInterval(()=>{window.close();},2500);
  });
  build.addEventListener("click",()=>{
    console.log("build selected");
    let message = {type: "choseBuild"}
    chrome.runtime.sendMessage(message);
    selectTasks.classList.add("hidden");
    popupMessage.innerHTML = "Ok! Let's get to work! See you in 1 hour";
    popupMessage.style.top = "25%";
    setInterval(()=>{window.close();},2500);
  });
}
