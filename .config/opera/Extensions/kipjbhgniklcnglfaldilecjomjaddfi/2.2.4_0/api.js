(function(chrome) {
  var callbacks = {};
  var lastCallbackId = 0;
  var addCallback = function(fn){
    var id = lastCallbackId+1;
    callbacks[id] = fn;
    return id;
  };

  var send = function(data,callback){
    if(callback)data.callback_id = addCallback(callback);
    window.postMessage(data, "*");
  }

  window.addEventListener("message", function(event) {
    var type = event.data.type;

    if(type.indexOf('webstorePrivate') == 0 ||  type.indexOf('management') == 0){
      if(event.data.callback_id && event.data.isCallback){//if is a callback form bg
        var id = event.data.callback_id;
        if(id && callbacks[id]!=null){
          callbacks[id](event.data.data);
        };
      }
      if(type == 'management.onInstalled'){//install event
        onInstalledListeners.forEach(function(handler){
          handler(event.data.data);
        })
      }
      if(type == 'management.onEnabled'){//enabled event
        onEnabledListeners.forEach(function(handler){
          handler(event.data.data);
        })
      }
      if(type == 'management.onDisabled'){//disabled event
        onDisabledListeners.forEach(function(handler){
          handler(event.data.data);
        })
      }
      if(type == 'management.onUninstalled'){//uninstall event
        onUninstalledListeners.forEach(function(handler){
          handler(event.data.data);
        })
      }
    }
  }, false);

  var webstorePrivate = Object.create(Object.prototype, {
      enableAppLauncher: {
          writable:false, configurable:false,
          value: function () {}
      },
      setStoreLogin: {
      writable:false, configurable:false,
      value: function (login,callback) {
        send({type: "webstorePrivate.setStoreLogin", data: login});

        if(callback)callback();
      }
    },
    beginInstallWithManifest3: {
      writable:false, configurable:false,
      value: function (details, callback) {
        if (details.manifest) {
          var manifest = JSON.parse(details.manifest);
          if (manifest.app !== undefined) {
            alert('This is an app. Opera does\'t support apps.');
          } else if (manifest.theme !== undefined) {
            alert('This is a theme. This extension doesn\'t support chromium theme format.');
          } else {
            send({type: "webstorePrivate.beginInstallWithManifest3", data: details});
            if (callback) {
              callback("");
            }
          }
        }
      }
    },
    completeInstall: {
      writable:false, configurable:false,
      value: function (id, callback) {
        //console.log('webstorePrivate.completeInstall', arguments);
        //maybe then should be enabled
        if(callback)callback([]);
      }
    },
    getBrowserLogin: {
      writable:false, configurable:false,
      value: function (callback) {
        chrome.webstorePrivate.getStoreLogin(function(login){
          callback({
            login: login
          });
        });
      }
    },
    getIsLauncherEnabled: {
      writable:false, configurable:false,
      value: function (callback) {
        //console.log('webstorePrivate.getIsLauncherEnabled', arguments);
        callback(false);
      }
    },
    getStoreLogin: {
      writable:false, configurable:false,
      value: function (callback) {
        send({type: "webstorePrivate.getStoreLogin"},callback);
        //callback("");
      }
    },
    getWebGLStatus: {
      writable:false, configurable:false,
      value: function (callback) {
        //console.log('webstorePrivate.getWebGLStatus', arguments);
        callback("webgl_allowed");
      }
    },
    install: {
      writable:false, configurable:false,
      value: function () {
        //console.log('webstorePrivate.install', arguments);
      }
    },
    installBundle: {
      writable:false, configurable:false,
      value: function (details, callback) {
        //console.log('webstorePrivate.installBundle', arguments);
        if(callback)callback();
      }
    }
   });

  var onInstalledListeners = [];
  var onEnabledListeners = [];
  var onDisabledListeners = [];
  var onUninstalledListeners = [];

  var management = Object.create(Object.prototype, {
    getAll: {
      writable:false, configurable:false,
      value: function (callback) {
        send({type: "management.getAll"},callback);
      }
    },
    launchApp: {
      writable:false, configurable:false,
      value: function (id, callback) {
        console.log('management.launchApp', arguments);
        if(callback)callback();
      }
    },
    uninstall: {
      writable:false, configurable:false,
      value: function (id, options, callback) {
        console.log('management.uninstall', arguments);
        if(callback)callback();
      }
    },
    onEnabled: {
      writable:false, configurable:false,
      value: Object.create(Object.prototype, {
        addListener: {
          writable:false, configurable:false,
          value: function (fn) {
            onEnabledListeners.push(fn);
          }
        },
        removeListener: {
          writable:false, configurable:false,
          value: function (fn) {
            var index = onEnabledListeners.indexOf(fn);
            if(index!=-1)onEnabledListeners.splice(index,1);
          }
        }
      })
    },
    onDisabled: {
      writable:false, configurable:false,
      value: Object.create(Object.prototype, {
        addListener: {
          writable:false, configurable:false,
          value: function (fn) {
            onDisabledListeners.push(fn);
          }
        },
        removeListener: {
          writable:false, configurable:false,
          value: function (fn) {
            var index = onDisabledListeners.indexOf(fn);
            if(index!=-1)onDisabledListeners.splice(index,1);
          }
        }
      })
    },
    onInstalled: {
      writable:false, configurable:false,
      value: Object.create(Object.prototype, {
        addListener: {
          writable:false, configurable:false,
          value: function (fn) {
            onInstalledListeners.push(fn);
          }
        },
        removeListener: {
          writable:false, configurable:false,
          value: function (fn) {
            var index = onInstalledListeners.indexOf(fn);
            if(index!=-1)onInstalledListeners.splice(index,1);
          }
        }
      })
    },
    onUninstalled: {
      writable:false, configurable:false,
      value: Object.create(Object.prototype, {
        addListener: {
          writable:false, configurable:false,
          value: function (fn) {
            onUninstalledListeners.push(fn);
          }
        },
        removeListener: {
          writable:false, configurable:false,
          value: function (fn) {
            var index = onUninstalledListeners.indexOf(fn);
            if(index!=-1)onUninstalledListeners.splice(index,1);
          }
        }
      })
    }
  });

  Object.defineProperty(chrome, "webstorePrivate", {
    configurable: false,
    writable: false,
    value: webstorePrivate
  });

  Object.defineProperty(chrome, "management", {
    configurable: false,
    writable: false,
    value: management
  });
})(chrome);