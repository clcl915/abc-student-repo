// what I need
// - detect url change
// - time spent on page -> to script.js
// - detect idle, detect screen sleep, detect url change, tab change
// - notification open popup html when complete
// - change tiles to home
// - storage add in progress of game

console.log("i am background");
chrome.extension.onConnect.addListener(function(port) {
      console.log("Connected .....");
      port.onMessage.addListener(function(msg) {
           console.log("message recieved" + msg);
           port.postMessage("Hi Popup.js");
      });
 })
let localIntroStatus = false;
let farmSuccess = false;let gardenSuccess = false;let buildSuccess = false;
let taskfailed= false;
chrome.storage.sync.set({finishedIntro: localIntroStatus,farmSuccess: farmSuccess,gardenSuccess: gardenSuccess,buildSuccess: buildSuccess},function(){
  console.log("set localstorage");
});
// chrome.browserAction.onClicked.addListener(function (tab){
//   console.log("browser icon clicked");
// });

function handleMessage(request, sender, sendResponse){
  console.log(request);
  if (request.type=="finishedIntro"){
    //see if tabs changed
    checkIntro();
    localIntroStatus = true;
    chrome.storage.sync.set({finishedIntro: localIntroStatus},function(){
      console.log("finished introduction");
    });
  }
  else if (request.type=="getStatus"){
    var data = {};

    //   console.log("key is" + key);
    //   console.log(data);
    //   let keystring = "'" + key +"'" ;
    //   console.log("keystring is" + keystring);
    //   let keyvalue= chrome.storage.local.get(function(result){console.log(result[key]);return result[key]});
    //   console.log(keyvalue);
    //   data[key] = keyvalue;
    //   console.log("data is " + data[key]);
    // });
    // sendResponse({data: data});
    // console.log(data);
    // return true;
    sendResponse(localIntroStatus);
  }
  else if (request.type=="choseFarm"){
    //15mins
    let taskfailed= false;
    console.log("the user is farming");
    chrome.alarms.create("1min", {
      delayInMinutes: 1,
      periodInMinutes: 1
    });
    // sendResponse(localIntroStatus);
  }
  else if (request.type=="choseGarden"){
    //15mins
    let taskfailed= false;
    console.log("the user is gardening");
    chrome.alarms.create("30min", {
      delayInMinutes: 1,
      periodInMinutes: 1
    });
    // sendResponse(localIntroStatus);
  }
  else if (request.type=="choseBuild"){
    //15mins
    let taskfailed= false;
    console.log("the user is building");
    chrome.alarms.create("1hr", {
      delayInMinutes: 1,
      periodInMinutes: 1
    });
    // sendResponse(localIntroStatus);
  }
  // console.log("counter in background", counter );
}

function checkIntro(){
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // alert('changed');
    console.log("Updated tab (" + tabId + ")=>>> " + tab.url);
  })
}

//detect if new tab was opened and send notification
chrome.tabs.onCreated.addListener(function(tab) {
   console.log("new tab created");
   taskfailed = true;
   chrome.notifications.create('', {
     title: 'PRODO HOME',
     message: 'Task failed! You opened a new tab :( \n Open your prodo home',
     iconUrl: 'house.png',
     type: 'basic'
   });
});

chrome.idle.setDetectionInterval(300);
chrome.idle.onStateChanged.addListener((newState)=>{
  console.log("STATE CHANGED", newState);
  let message = {type: newState}
  chrome.runtime.sendMessage(message);
  // chrome.browserAction.openPopup();
  if (newState =="idle")
  {
    taskfailed = true;
    chrome.notifications.create('', {
      title: 'PRODO HOME',
      message: 'Task failed! You opened a new tab :( \n Open your prodo home',
      iconUrl: 'house.png',
      type: 'basic'
    });
    console.log("sent");
  }
})
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "1min") {
    if (taskfailed != true){
      console.log("been a minute");
      chrome.notifications.create('', {
        title: 'PRODO HOME',
        message: 'Farm Task success! \n Check on your prodo home!',
        iconUrl: 'house.png',
        type: 'basic'
      });
      farmSuccess = true;
      chrome.storage.sync.set({farmSuccess: farmSuccess},function(){
        console.log("finished 15mins farming");
      });
      chrome.extension.onConnect.addListener(function(port) {
            console.log("Connected .....");
            port.onMessage.addListener(function(msg) {
                 console.log("message recieved" + msg);
                 port.postMessage("farmsuccess");
            });
       })
    }
    chrome.alarms.clear("1min");
  }
  else if (alarm.name === "30min") {
    if (taskfailed != true){
      console.log("been 30 minutes");
      chrome.notifications.create('', {
        title: 'PRODO HOME',
        message: 'Garden Task success! \n Check on your prodo home!',
        iconUrl: 'house.png',
        type: 'basic'
      });
      gardenSuccess = true;
      chrome.storage.sync.set({gardenSuccess: gardenSuccess},function(){
        console.log("finished 30mins gardening");
      });
      chrome.extension.onConnect.addListener(function(port) {
            console.log("Connected .....");
            port.onMessage.addListener(function(msg) {
                 console.log("message recieved" + msg);
                 port.postMessage("gardensuccess");
            });
       });
     }
    chrome.alarms.clear("30min");
  }
  else if (alarm.name === "1hr") {
    if (taskfailed != true){
      console.log("been 1 hr");
      chrome.notifications.create('', {
        title: 'PRODO HOME',
        message: 'Build Task success! \n Check on your prodo home!',
        iconUrl: 'house.png',
        type: 'basic'
      });
      gardenSuccess = true;
      chrome.storage.sync.set({buildSuccess: buildSuccess},function(){
        console.log("finished 1 hr build");
      });
      chrome.extension.onConnect.addListener(function(port) {
            console.log("Connected .....");
            port.onMessage.addListener(function(msg) {
                 console.log("message recieved" + msg);
                 port.postMessage("buildsuccess");
            });
       });
      }
    chrome.alarms.clear("1hr");
  }
});

chrome.runtime.onMessage.addListener(handleMessage);
