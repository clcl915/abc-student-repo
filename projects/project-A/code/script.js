let mobileMessage = document.getElementById('mobileMessage');


function detectDevice(){
  console.log(!!navigator.maxTouchPoints)
  // mobileMessage.innerHTML += "This is best viewed on mobile screens!";

  //if user is on mobile
  if (!!navigator.maxTouchPoints){
    mobileMessage.innerHTML += "This is best viewed on mobile screens!";
  }
  //if user is on desktop
  else{
    // mobileMessage.innerHTML += "Please view this on a mobile device!";
    window.alert("This is best viewed on mobile screens! \n Please view this on a mobile device");
  }
  // return !!navigator.maxTouchPoints ? 'mobile' : 'computer'
}

detectDevice()

//has to connect with https
if (window.DeviceOrientationEvent) {
  window.alert("yes");
  console.log("yes");
  // window.addEventListener('deviceorientation', deviceOrientationHandler, false);
  window.addEventListener("deviceorientation", function(e){
    handler(e);
}, false);
  mobileMessage.innerHTML = "Supported!";
  document.getElementsByClassName('square').backgroundColor="green";
}
function handler(event) {
  // event.preventDefault();
  mobileMessage.style.color="green";
  mobileMessage.innerHTML += "this works";
  console.log("does this work");
  var x = event.beta;
  var y = event.gamma;
  var width = window.outerWidth;
  var rot = event.gamma / 360;
  var left = ( width / 2 ) * rot;
  console.log(left);
  mobileMessage.style.left = left + 'px';
  // $('.square').css({
  //   'top':x,
  //   'left': y
  // });
  mobileMessage.innerHTML += "do u work";
}
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
