console.log('hi');
let button = document.getElementById('button');
let box = document.getElementById('box');

let boxAngle = 0;

button.addEventListener('click',()=>{
  boxAngle +=360;
  box.style.transform = "rotate("+boxAngle + "deg)";
})

let buttonAngle = 0;

box.addEventListener('click',()=>{
  buttonAngle +=360;
  button.style.transform = "rotate("+buttonAngle + "deg)";
})
