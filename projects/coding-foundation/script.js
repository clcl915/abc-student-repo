function createSquares(){
  event.preventDefault();
  event.stopImmediatePropagation()
  document.getElementById('squaresArea').innerHTML = '';
  let count= document.getElementById('numSquares').value;
  console.log(count);
  for (var i=0;i<count;i++){
    var singleSquare = document.createElement('div');
    singleSquare.className = "square";
    document.getElementById("squaresArea").appendChild(singleSquare);
  }
}
