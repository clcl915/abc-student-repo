let container = document.getElementsByClassName('container')[0];
let overlay = document.getElementsByClassName('overlay')[0];
let answer = document.getElementById("answer");
let message = document.getElementById("message");
let submitButton = document.getElementById("submitButton");
let arrayOfOptions = ["apple","apples","banana","bananas","orange","oranges","mango","mangos","strawberry","strawberries","blueberry","blueberries","watermelon","watermelons"];

let imageArray = ["https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/red-apple_1f34e.png","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/banana_1f34c.png","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/tangerine_1f34a.png","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/mango_1f96d.png","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/strawberry_1f353.png","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/blueberries_1fad0.png","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/watermelon_1f349.png"];
let favfruit;let favfruitImgSrc;let foundfruit=false;

submitButton.addEventListener("click", ()=>{
  console.log("idk");
  findFruit();
  if (message.innerHTML == ""){
    let populateFruitInterval = setInterval(()=>{
      populate();
    },500);
    setTimeout(function(){
      clearInterval(populateFruitInterval);
    }, 10000);
  }

  // setTimeout(function(){
  //   for (var i= document.images.length; i-->0;){
  //     document.images[i].parentNode.removeChild(document.images[i]);
  //   }
  // }, 20000);
})

function findFruit(){
  foundfruit=false;
  message.innerHTML = "";
  favfruit = answer.value;
  let imageArrayNum=0;
  for (let i=0;i<arrayOfOptions.length;i+=2){
    if (favfruit == arrayOfOptions[i] || favfruit == arrayOfOptions[i+1]){
      favfruitImgSrc = imageArray[imageArrayNum];
      console.log(favfruitImgSrc);
      foundfruit = true;
    }
    imageArrayNum+=1;
  }
  if (foundfruit == false){
    message.innerHTML = "i don't know that fruit";
  }
}
function populate(){
  let img=document.createElement('img');
  img.src=favfruitImgSrc;
  img.style.left=Math.random()*window.innerWidth+"px";
  img.style.top=Math.random()*window.innerHeight+"px";
  overlay.appendChild(img);
}
