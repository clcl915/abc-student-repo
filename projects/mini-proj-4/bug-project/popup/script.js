// chrome.tabs.query(whatquery, whattodo)
function receivedTabsFromChrome(tabs){
  let currentTab = tabs[0];
  // chrome.tabs.sendMessage(receiver,message)
  chrome.tabs.sendMessage(currentTab.id,"populate now")
}
chrome.tabs.query({active:true,currentWindow:true},receivedTabsFromChrome)
