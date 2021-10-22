console.log("i am background");
let counter = 0;

chrome.storage.local.get(['counterInStorage'], function(result){
  console.log("got this from storage", result);
  console.log('value currently is '+ result.counterInStorage);
  if (result.counterInStorage == "undefined"){
    counter = 0;
    chrome.storage.local.get(['counterInStorage'], function(result){
      counter = result.counterInStorage;
    });
  }
  counter = result.counterInStorage;
});

function handleMessage(request, sender, sendResponse){
  console.log(request);
  if (request.type=="increaseCounter"){
    //increase local counter
    counter++;
    //increase counter in local storage
    chrome.storage.local.set({counterInStorage: counter},function(){
      console.log("Saved", counter, 'to local storage.');
    });
  }
  else if (request.type=="getCount"){
    sendResponse(counter)
  }
  // console.log("counter in background", counter );
}

chrome.runtime.onMessage.addListener(handleMessage);
