var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-107206749-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


// Saves options to chrome.storage
function save_options() {
  var squishThreshold = document.getElementById('len').value;
  chrome.storage.sync.set({
    threshold: squishThreshold
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    threshold: '50'
  }, function(items) {
    document.getElementById('len').value = items.threshold;
  });
}

$(document).ready(function(){
  restore_options();
});
document.getElementById('save').addEventListener('click',
    save_options);
