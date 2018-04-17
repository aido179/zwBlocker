var totalCount = 0;
var zwMatches = new RegExp("[\u200B-\u200D\uFEFF]","g");

let walker = document.createTreeWalker(
                document,
                NodeFilter.SHOW_TEXT,
                { acceptNode:
                  function(node) {
                    if(  node.nodeType == Node.TEXT_NODE
                      && node.parentNode.nodeName !== "SCRIPT"
                      && node.nodeValue.match(zwMatches)
                    ){
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


function testForZeroWidthCharacters(text){
  return text.match(zwMatches);
}
function removeZeroWidthCharacters(text){
  return text.replace(zwMatches, "");
}
function replaceZeroWidthCharacters(text){
  return text.replace(zwMatches, "💀");
}
