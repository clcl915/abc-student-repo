const express = require('express')
const app = express()
const port = 3000
// const port = process.env.PORT //for glitch
const correctAnswer = "blueberry";
const correctAnswerVariation = "blueberries";

app.use(express.static("public"));

app.get('/answer', (request, response) => {
  let query = request.query;
  let guess = query.guess;
  console.log("someone guessed " + guess);
  if (guess == correctAnswer || guess == correctAnswerVariation){
    console.log("right");
    // response.redirect("/opened/");
    response.json({value: "correct!"});
    // response.sendFile(__dirname + '/public/opened/index.html');
  }
  else{
    console.log("wrong");
    response.json({value: "wrong! try again"})
  }
  console.log("____");
});
// app.get('/getCurrent', (req, res) => {
//   console.log("someone check for updates")
//   res.json({value: counter})
//
// })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
