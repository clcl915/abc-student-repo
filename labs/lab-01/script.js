console.log("I am here");

let range = document.getElementById("myRange");
let valueDisplay= document.getElementById("valueDisplay");

console.log(range);

// function changeHappened(){
//     console.log("a change happened");
// }
// range.addEventListener("change", changeHappened);


function inputHappened(){
    console.log("a input happened");
    let value = range.value;
    valueDisplay.innerHTML = value;
    valueDisplay.style.left = value*2 + "px";
    range.style.left = 100-value + "px";
}
range.addEventListener("input", inputHappened);