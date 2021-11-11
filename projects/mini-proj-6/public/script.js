let container = document.getElementsByClassName('container')[0];
let answer = document.getElementById("answer");
let message = document.getElementById("message");
let submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", ()=>{
  let guess = answer.value;
  guess = guess.toLowerCase();
  console.log("they guessed "+ guess);
  fetch("/answer?guess=" + guess)
    .then(data=>data.json())
    .then(data=>{
      console.log("Button clicked");
      console.log("got data ", data);
      document.getElementsByTagName("BODY")[0].style.background = '#152238';
      document.getElementsByTagName("BODY")[0].style.color = 'white';
      message.innerHTML = data.value;
      if (data.value == "correct!"){
        window.location.href="/opened";
      }
    })
  console.log("idk");
})
