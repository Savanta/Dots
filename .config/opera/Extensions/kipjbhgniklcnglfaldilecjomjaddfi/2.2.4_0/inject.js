var url = chrome.extension.getURL('api.js');
var script = document.createElement('script');
script.setAttribute('src', url);

document.documentElement.appendChild(script);
document.documentElement.removeChild(script);

var observer = new MutationObserver(function (records) {
  for (var i = 0; i < records.length; i++) {
    var lg = records[i].addedNodes.length;
    for (var j = 0; j < lg; j++) {
      var item = records[i].addedNodes[j];
      var items = [];
      if (!item.classList || !item.classList.contains('webstore-test-button-label')) {
        if (item.querySelectorAll)items = item.querySelectorAll('.webstore-test-button-label');
        else items = null;
      }
      ;

      if (items)Array.prototype.forEach.apply(items, [function (element) {
        var shadow = element;
        var text = shadow.textContent;

        if (shadow.shadowRoot) {
          shadow = shadow.shadowRoot;
          text = shadow.textContent;
        } else {
          shadow = shadow.createShadowRoot();
        }

        shadow.textContent = text.toLowerCase().replace('chrome', 'opera').toUpperCase();

      }]);
    }
  }
  ;
});

observer.observe(document.documentElement, {childList: true, subtree: true});

var port = chrome.runtime.connect();

port.onMessage.addListener(function (msg) {
  //pass all messages to the api
  msg.isCallback = true;
  window.postMessage(msg, ["https://chrome.google.com/webstore/*", "http://chrome.google.com/webstore/*"]);
});

window.addEventListener("message", function (event) {
  var type = event.data.type;

  if (!type || event.origin.indexOf('chrome.google.com') == -1 || event.data.isCallback)return;
  if (type.indexOf('webstorePrivate') == 0 || type.indexOf('management') == 0) {
    event.data.isCallback = false;
    port.postMessage(event.data);
  }

}, false);