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
window.addEventListener('deviceorientation', function(event) {
  alert(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
});
window.addEventListener("deviceorientation", function(event) {
  console.log(event.gamma);
});

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(event) {
        // alpha: rotation around z-axis
        var rotateDegrees = event.alpha;
        // gamma: left to right
        var leftToRight = event.gamma;
        // beta: front back motion
        var frontToBack = event.beta;

        handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
    }, true);
}

var handleOrientationEvent = function(frontToBack, leftToRight, rotateDegrees) {
    console.log("moving");
};
