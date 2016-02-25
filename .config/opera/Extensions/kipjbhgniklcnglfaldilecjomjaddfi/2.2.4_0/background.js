localStorage["login"] = "";

function getDownloadLink(id) {
  var deferred = Promise.defer();
  chrome.runtime.getPlatformInfo(function(platformInfo) {
    var version = navigator.userAgent.match(/chrome\/([0-9.]*)\s/i)[1];
    var link = "https://clients2.google.com/service/update2/crx?response=redirect";
    link += '&os=' + platformInfo.os;
    link += '&arch=' + platformInfo.arch;
    link += '&nacl_arch=' + platformInfo.nacl_arch;
    link += '&prod=' + 'chromiumcrx';
    link += '&prodchannel=' + 'unknown';
    link += '&prodversion=' + version;
    link += '&x=id%3D' + id + '%26uc';
    
    deferred.resolve(link);
  });

  return deferred.promise;
}

function parseIDFromLink(url) {
  try{
    var pathArray = url.split('/');
    var lastArray = pathArray[6].split('?');
    return lastArray[0];
  } catch(e) {
    return null;
  };
}

function install(id, tabId) {
  if(!id)
    return;

  chrome.pageAction.hide(tabId);
    
  getDownloadLink(id).then(function(link) {
    chrome.downloads.download({
      url:  link,
      filename: id + '.nex'
    }, function() {});
  });
}

chrome.pageAction.onClicked.addListener(function(tab) {
  var id = parseIDFromLink(tab.url);
  install(id, tab.id);
});

//add or remove pageAction
function updatePageAction(id) {
  chrome.tabs.get(id, function(tab) {
    if(!tab.url || !tab.url.indexOf('chrome.google.com/webstore'))
      return;


    if (tab.url && tab.url.indexOf('chrome.google.com/webstore/detail/')!=-1) {
      var extId = parseIDFromLink(tab.url);
      if (extId) {
        chrome.management.getAll(function(list) {
          var exist = list.some(function(element){
            return (element.id == extId);
          });

          if (exist) {
            chrome.pageAction.hide(id);
          } else {
            chrome.pageAction.show(id); 
          }
        });
      } else {
        chrome.pageAction.hide(id);
      }
    } else {
      chrome.pageAction.hide(id);
    };
  });
}

chrome.tabs.onActivated.addListener(function(info) {
  updatePageAction(info.tabId);
});

chrome.tabs.onUpdated.addListener(updatePageAction);

var activePorts = [];

chrome.runtime.onConnect.addListener(function(port) {
  activePorts.push(port);
  port.onDisconnect.addListener(function() {
    var index = activePorts.indexOf(port);
    if(index!=-1)activePorts.splice(index,1);
  });
  port.onMessage.addListener(function(msg) {
    var callback_id = msg.callback_id;
    if(msg.type=='webstorePrivate.beginInstallWithManifest3'){
      install(msg.data.id, port.sender.tab.id);
    } else if(msg.type=='management.getAll'){
      chrome.management.getAll(function(list){
        var filtered = list.filter(function(el){
          return (el.updateUrl && el.updateUrl.indexOf('clients2.google.com')!=-1)?true:false;
        });

        port.postMessage({
          type: "management.getAll",
          data: filtered,
          callback_id: callback_id
        });

      });
    } else if(msg.type=='webstorePrivate.getStoreLogin') {
      port.postMessage({type: "webstorePrivate.getStoreLogin", data: localStorage["login"], callback_id: callback_id});
    } else if(msg.type=='webstorePrivate.setStoreLogin') {
      localStorage["login"] = msg.data;
    }
  });
});

chrome.management.onInstalled.addListener(function(details) {
  activePorts.forEach(function(port){
    port.postMessage({type: 'management.onInstalled', data: details});
  });
});

chrome.management.onUninstalled.addListener(function(id) {
  activePorts.forEach(function(port){
    port.postMessage({type: 'management.onUninstalled', data: id});
  });
});

chrome.management.onEnabled.addListener(function(details) {
  activePorts.forEach(function(port){
    port.postMessage({type: 'management.onEnabled', data: details});
  });
});

chrome.management.onDisabled.addListener(function(details) {
  activePorts.forEach(function(port) {
    port.postMessage({type: 'management.onDisabled', data: details});
  });
});
