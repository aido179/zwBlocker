$(document).ready(function(){
  $(".version").text(chrome.runtime.getManifest().version);
});
