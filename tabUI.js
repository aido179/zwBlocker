function restore_options() {
  chrome.storage.sync.get(['selectedText','selectedTextClean','selectedTextEmoji'], function(data) {
    //$('.selected').val(data.selectedText);
    $('.selected-clean').text(data.selectedTextClean);
    $('.selected-emoji').text(data.selectedTextEmoji);
  });
}

$(document).ready(function(){
  restore_options();
});

function copyFromElement(element){
  $(element).selectText();
  document.execCommand("Copy");
}

$("#btn-copy-clean").click(function(){
  copyFromElement('#clean');
  $(this).text("Copied!");
});
$("#btn-copy-emoji").click(function(){
  copyFromElement('#emoji');
  $(this).text("Copied!");
});

jQuery.fn.selectText = function(){
   var doc = document;
   var element = this[0];
   console.log(this, element);
   if (doc.body.createTextRange) {
       var range = document.body.createTextRange();
       range.moveToElementText(element);
       range.select();
   } else if (window.getSelection) {
       var selection = window.getSelection();
       var range = document.createRange();
       range.selectNodeContents(element);
       selection.removeAllRanges();
       selection.addRange(range);
   }
};
