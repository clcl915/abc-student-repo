let sometext = document.getElementById('sometext');
let imageDiv = document.getElementsByClassName("imageDiv")[0];
let image = document.getElementById('image');

function handleMessage(request, sender, sendResponse) {
  console.log("request type is" + request.type);
  imageDiv.style.display ="block";
  if(request.type == "idle"){
      sometext.innerHTML = "IDLE! <br> 你在干嘛呢？";
      image.src="../images/idle-cat-sticker.jpg";
  }
  else if (request.type == "active"){
    sometext.innerHTML = "ACTIVE! <br> Oh hi";
    image.src="../images/active-cat-sticker.jpg";
  }
  // chrome.runtime.sendMessage('', {
  //   type: 'notification',
  //   options: {
  //     title: 'Just wanted to notify you',
  //     message: 'How great it is!',
  //     iconUrl: 'heart.png',
  //     type: 'basic'
  //   }
  // });
}

chrome.runtime.onMessage.addListener(handleMessage);
// chrome.runtime.connect({ name: "popup" });
