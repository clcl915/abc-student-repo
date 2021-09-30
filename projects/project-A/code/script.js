let mobileMessage = document.getElementById('mobileMessage');
let mainBody = document.getElementsByClassName('svgContainer')[0];
let container= document.getElementsByClassName('container')[0];
let middleX= mainBody.getBoundingClientRect().top;
let middleY = mainBody.getBoundingClientRect().left;
// console.log(middleX + "and" + middleY);


console.log(mainBody);
// var orientation = screen.orientation;

function detectDevice(){
  console.log(!!navigator.maxTouchPoints)
  // mobileMessage.innerHTML += "This is best viewed on mobile screens!";

  //if user is on mobile
  if (!!navigator.maxTouchPoints){
    container.style.display="flex";
    mobileMessage.innerHTML += "Try to move me off the screen!";
  }
  //if user is on desktop
  else{
    // mobileMessage.innerHTML += "Please view this on a mobile device!";
    window.alert("This is best viewed on mobile screens! \n Please view this on a mobile device");
  }
  // return !!navigator.maxTouchPoints ? 'mobile' : 'computer'
}

detectDevice()

// document.getElementById('button').addEventListener('click', ()=>{
//   // var x = event.touches[0].clientX;
//   // var y = event.touches[0].clientY;
//   mainBody.style.position = 'absolute';
//   mainBody.style.left = 0 + 'px';
//   mainBody.style.top = 0 +'px' ;
//
// })
window.addEventListener("touchstart", function(event){
  var x = event.touches[0].clientX;
  var y = event.touches[0].clientY;
  mainBody.style.position = 'absolute';
  mainBody.style.left = x/2 + 'px';
  mainBody.style.top = y/2 +'px' ;
  document.getElementById("mobileMessage").innerHTML = x + ", " + y;
  return false;
});
window.addEventListener("touchmove", function(event){
  var x = event.touches[0].clientX;
  var y = event.touches[0].clientY;
  mainBody.style.position = 'absolute';
  mainBody.style.left = x/2 + 'px';
  mainBody.style.top = y/2 +'px' ;
  return false;
});
window.addEventListener("touchend", function(event){
  mainBody.style.position = 'absolute';
  mainBody.style.top = middleX + 'px';
  mainBody.style.left = middleY + 'px';
  return false;
});
//has to connect with https
// if (window.DeviceOrientationEvent) {
//   window.alert("yes");
//   console.log("yes");
//   // window.addEventListener('deviceorientation', deviceOrientationHandler, false);
//   window.addEventListener("deviceorientation", function(e){
//     handler(e);
// }, true);
//   mobileMessage.innerHTML = "Supported!";
//   document.getElementsByClassName('square')[0].style.backgroundColor="green";
// }
// function handler(event) {
//   // event.preventDefault();
//   mobileMessage.style.color="green";
//   mobileMessage.innerHTML += "this works";
//   console.log("does this work");
//   var x = event.beta;
//   var y = event.gamma;
//   var width = window.outerWidth;
//   var rot = event.gamma / 360;
//   var left = ( width / 2 ) * rot;
//   console.log(left);
//   mobileMessage.style.left = left + 'px';
//   // $('.square').css({
//   //   'top':x,
//   //   'left': y
//   // });
//   mobileMessage.innerHTML += "do u work";
// }
// function deviceOrientation(event) {
//   mobileMessage.innerHTML += "This is working!";
//   alert(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
//   window.removeEventListener('deviceorientation', deviceOrientation);
//   mobileMessage.innerHTML += "This is still working!";
// }
// window.addEventListener('deviceorientation', deviceOrientation);
//
// if (window.DeviceOrientationEvent) {
//     window.addEventListener("deviceorientation", function(event) {
//         // alpha: rotation around z-axis
//         var rotateDegrees = event.alpha;
//         // gamma: left to right
//         var leftToRight = event.gamma;
//         // beta: front back motion
//         var frontToBack = event.beta;
//
//         handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
//     }, true);
// }
//
// var handleOrientationEvent = function(frontToBack, leftToRight, rotateDegrees) {
//     console.log("moving");
// };
