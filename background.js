chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === "updateBadgeNumber"){
      //this isn't setting the text for each tab id...
      if(request.value<100){
        chrome.browserAction.setBadgeText({"text": request.value.toString(), "tabId":sender.tab.id});
      }else{
        chrome.browserAction.setBadgeText({"text": "99+", "tabId":sender.tab.id});
      }
    }
    if(request.message === "warnUserOfZeroWidthChars"){
      chrome.notifications.create("zwBlockerWarningNotification", {
        type:"basic",
        iconUrl:"logo.png",
        title:"zwBlocker Warning!",
        message:"A zero-width character has been detected.",
        priority:2,
        buttons:[
          {
            title:"Get safe version"
          }
        ],
        requireInteraction:true
      });
    }
  }
);
chrome.notifications.onButtonClicked.addListener(function(notification, button){
  if(button==0){
    //show with emojis
    chrome.tabs.create({ url: 'tabUI.html' },function(tabs){
    });
  }else if(button==1){
    //show safe version
    chrome.runtime.sendMessage({message: "showSelectionSafe"}, function(response) {
    });
  }
});


/*
  Show message when the extension is updated.
*/

chrome.runtime.onInstalled.addListener(function (details) {
  try {
    var thisVersion = chrome.runtime.getManifest().version;
    if (details.reason == "update") {
      chrome.tabs.create({ url: 'update.html' },function(tabs){
      });
    }
  } catch(e) {
    console.info("OnInstall Error - " + e);
  }
});
