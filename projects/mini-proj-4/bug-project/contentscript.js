console.log("hello");
let imgURL = chrome.extension.getURL('hehe-doraemon.png');
let container = document.getElementsByClassName('container')[0];
let removeImgsFunction;
let sw=screen.width;
let sh=screen.height;
console.log(sw + " width " + sh);
console.log(Math.floor(Math.random() * sw)+"px");
function infest(){
  console.log("investing");
  var div = document.createElement("DIV");
  div.id = "someName";
  var img = document.createElement("IMG");
  img.src = imgURL;
  div.appendChild(img);
  img.style.top = Math.floor(Math.random() * sh)+"px";
  img.style.left = Math.floor(Math.random() * sw)+"px";
  document.body.appendChild(div);
}

function gotMessage(request, sender, sendResponse){
  console.log(request);
  // infest();
  clearInterval(infestion);
  // while ( body.firstChild )
  //   container.removeChild(container.firstChild);
  let removeImgs = document.querySelectorAll("#someName");
  console.log("removeImgs is " + removeImgs.length);
  removeImgsFunction = setInterval(removeOneImg,400);
}
function removeOneImg(){
  let removeImgs = document.querySelectorAll("#someName");
  if (removeImgs.length == 0){
    clearInterval(removeImgsFunction);
    return
  }
  console.log("removeImgs is " + removeImgs.length);
  removeImgs[0].remove();
  console.log("removed");

}
let infestion = setInterval(infest,400);
chrome.runtime.onMessage.addListener(gotMessage);
// chrome.tabs.onUpdated.addListener(gotMessage);
