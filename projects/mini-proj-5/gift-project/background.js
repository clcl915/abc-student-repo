chrome.notifications.getPermissionLevel((status)=>{
  console.log("status is "+ status);
});
var today = new Date();
var time = parseInt(today.getHours());
console.log(time);
// if idle for 2 minutes then create idle notification
chrome.idle.setDetectionInterval(120);
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
      requireInteraction: true,
      type: 'basic'
    });
    console.log("sent");
  }
  chrome.notifications.onClicked.addListener(()=>{this.close()});
})

if (time >=6 && time <=12){
  chrome.notifications.create('', {
    title: 'Good morning!',
    message: 'Hope you have a good day! Grab some morning coffee!',
    iconUrl: 'heart.png',
    type: 'basic'
  });
}
else if (time >=17 || time <=3){
  chrome.notifications.create('', {
    title: 'Good evening!',
    message: 'Make sure to sleep early today!',
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
