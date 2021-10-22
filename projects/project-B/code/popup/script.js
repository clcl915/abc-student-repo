let button = document.querySelector('#button');
let count = document.querySelector('#count');
let counter=0;

let message={type:"getCount"};

chrome.runtime.sendMessage(message,(response)=>{
  console.log("background script sent me this",response);
  counter=response;
  count.innerHTML = counter;
});

button.addEventListener("click", ()=>{
  counter++;
  let message={type:"increaseCounter"};
  chrome.runtime.sendMessage(message);
  count.innerHTML=counter;
});
