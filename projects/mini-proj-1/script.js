console.log("I am here");
let range = document.getElementById("myRange");
let container= document.getElementsByClassName('container')[0];
let secsToZero = 10;
console.log(range);

let rotateDegree = 30;


range.addEventListener("input", ()=>{
  console.log("a input happened");
  let value = range.value;
  let rotateInterval = value*rotateDegree;
  console.log(rotateInterval);
  container.style.backgroundColor='rgb('+ value + ','+value +','+ value +')';
  let nextRange = range.cloneNode(true);
  nextRange.style.transform = 'rotate('+ Math.floor(Math.random()*361) + 'deg)';
  nextRange.style.width = value*10+'px';
  nextRange.value = Math.floor(Math.random()*101);
  container.appendChild(nextRange);
});

range.addEventListener("change", ()=>{
  let inputs= document.getElementsByTagName('input');
  var arr = Array.prototype.slice.call(inputs);
  console.log("a change happened");
  console.log(arr);
  arr.forEach((item) => {
      let secsToZero = 10;
      setInterval(function () {
        item.value = item.value-10;
        item.style.width = item.value*5 + 'px';
        console.log(item.style.width);
        container.style.backgroundColor='rgb('+ item.value + ','+item.value +','+ item.value +')';
        secsToZero-=1;
      },1000);
    });

});
