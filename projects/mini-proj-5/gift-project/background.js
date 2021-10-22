
var today = new Date();
var time = parseInt(today.getHours());
console.log(time);
chrome.idle.setDetectionInterval(60);
let state;
chrome.idle.onStateChanged.addListener((newState)=>{
  console.log("STATE CHANGED", newState);
  let message = {type: newState}
  chrome.runtime.sendMessage(message);
  // chrome.browserAction.openPopup();
  if (newState =="idle")
  {
    chrome.notifications.create('', {
      title: '你在干嘛呢?',
      message: 'Watcha doing?',
      iconUrl: 'images/idle-cat-sticker.jpg',
      type: 'basic'
    });
    console.log("sent");
  }
})

if (time >=6 && time <=12){
  chrome.notifications.create('', {
    title: 'Good morning!',
    message: 'Hope you have a good day! Grab some coffee',
    iconUrl: 'heart.png',
    type: 'basic'
  });
}
else if (time >=17 || time <=3){
  chrome.notifications.create('', {
    title: 'Good evening!',
    message: 'Make sure to sleep early today 不不!',
    iconUrl: 'heart.png',
    type: 'basic'
  });
}
else{
  chrome.notifications.create('', {
    title: 'Good afternoon!',
    message: 'Dont get too sleepy! You got this!',
    iconUrl: 'images/active-cat-sticker.jpg',
    type: 'basic'
  });
}
