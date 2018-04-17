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
    if (request.message == "listeners"){
      /*//add event handler for button click
      chrome.tabs.executeScript(null, {file: "injectedScript.js"});

      //Google analytics
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-107206749-1']);
      _gaq.push(['_trackEvent', 'squishing tweet', 'squished']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = 'https://ssl.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
      // end google analytics

      sendResponse({message: "OK"});*/
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
