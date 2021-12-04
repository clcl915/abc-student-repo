let socket = io();
let myPeerId;
let myConnection =[];


// function that creates and returns mouse img
function getMouseImage(){
  let img= document.createElement("img");
  img.src="mouse.jpeg";
  img.className="mouse";
  document.body.appendChild(img);
  return img;
}
//create and attach my own mouse to mouse position
let ourMouse = getMouseImage()


document.body.addEventListener("mousemove", function(iMoveMouse){
  // console.log(iMoveMouse);
  ourMouse.style.left = iMoveMouse.clientX-20 + "px";
  ourMouse.style.top = iMoveMouse.clientY-10 + "px";

  for (let i=0; i<myConnection.length;i++){
    myConnection[i].connection.send({x:iMoveMouse.clientX,y:iMoveMouse.clientY});
  }
})


socket.on("welcomeToAT", function(welcomePack){
  //go to At&T shop and sign up for new landline phone
  console.log("Congrats and Welcome to AT&T. This is your phone number");
  console.log("wait for the technicain to come to your house and connect you to the network");
  console.log(welcomePack);

  //now we have our own phone number
  console.log("hey technician please connect my house and this is the phone number");
  myPeerId= welcomePack.yourPeerID;
  let peer= new Peer(myPeerID);


  //officially connected.
  peer.on('open', function(id) {
    //now we are ready to connect to peers
    console.log('Technician done. My peer ID is: ' + id);
    console.log("who to call?");

    for (let i=0;i<welcomePack.pleaseCall.length;i++){
      let callThisNumber = welcomePack.pleaseCall[i].peerID;
      if (callThisNumber != myPeerId){
        console.log("calling",callThisNumber);

        //calling....
        let conn = peer.connect(callThisNumber);

        //they picked up :
        conn.on('open', function(){
          console.log('connection now open');
          //keep track of our connections in this array
          //this results in the loop to send our X and Y location to all our connections
          myConnection.push({
            connection:conn
          })

          //create image for person WE called
          let img= getMouseImage();
          //push that image if this person sends us data
          conn.on('data', function(data){
            console.log('received', data);
            img.style.left = data.x-20 + "px";
            img.style.top = data.y-10 + "px";
          })
        })
      }

    }
  });


  //now that we are part of the peer network. when someone calls us on the peer network,
  //being called
  peer.on('connection',function(conn){
    console.log("i am being connected with on the network");
    //picking up
    conn.on('open', function(){
      console.log('connection now open');

      //keep track of all the people we are connected to by collecting them in this array
      myConnection.push({
        connection:conn
      })

    })
    //create img for person calling us
    let img= getMouseImage();
    //if they send us data, move their image around
    conn.on('data', function(data){
      console.log('received', data);
      img.style.left = data.x-20 + "px";
      img.style.top = data.y-10 + "px";
    })
  })
})
