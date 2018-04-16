/*var threshold = 50;//if sync.get fails, we use 50 as a default.

chrome.storage.sync.get({
  threshold: '50'
}, function(items) {
  threshold = items.threshold;
});*/

//find text on page


//var zwMatches = /(aidan|aido179)/;
var totalCount = 0;

let walker = document.createTreeWalker(
                document,
                NodeFilter.SHOW_TEXT,
                { acceptNode:
                    function(node) {
                      if(testForZeroWidthCharacters(node.nodeValue)){
                        totalCount++;
                        return NodeFilter.FILTER_ACCEPT;
                      }
                      else{
                        //FILTER_SKIP should keep the children of this node in consideration.
                        return NodeFilter.FILTER_SKIP;
                      }
                    }
                },
                false);
while(walker.nextNode());

//send message to background page to update the badge text
chrome.runtime.sendMessage({message: "updateBadgeNumber", value:totalCount}, function(response) {
});

//catch selected text and send message to background page
document.onselectionchange = function() {
  var selection = document.getSelection();
  if(testForZeroWidthCharacters(selection.toString())){
    chrome.storage.sync.set({
      selectedText: selection.toString(),
      selectedTextClean:removeZeroWidthCharacters(selection.toString()),
      selectedTextEmoji:replaceZeroWidthCharacters(selection.toString()),
    },function(){});
    /* show message*/
    chrome.runtime.sendMessage({message: "warnUserOfZeroWidthChars", value:selection.toString()}, function(response) {
    });
  }
};

var zwMatches = /[\u200B-\u200D\uFEFF]/g;
function testForZeroWidthCharacters(text){
  return text.match(zwMatches);
}
function removeZeroWidthCharacters(text){
  return text.replace(zwMatches, "");
}
function replaceZeroWidthCharacters(text){
  return text.replace(zwMatches, "💀");
}
//show ui
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.message === "showSelectionEmoji"){
    document.body.innerHTML+= "<div class='zwBlockerInjectedUIContainer'><span class='zwBlockerInjectedUITitle'>zwBlocker:</span></div>";
  }
});

/*
.css({
  "position":"fixed",
  "bottom":"20px",
  "left":"20px",
  "right":"20px",
  "min-height":"60px",
  "background-color":"white",
  "text-align":"center",
  "-webkit-box-shadow": "0px 2px 44px -2px rgba(0,0,0,0.75)",
  "-moz-box-shadow": "0px 2px 44px -2px rgba(0,0,0,0.75)",
  "box-shadow": "0px 2px 44px -2px rgba(0,0,0,0.75)"
})*/
