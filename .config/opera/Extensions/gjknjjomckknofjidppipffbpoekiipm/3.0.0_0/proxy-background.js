/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1);

	var pac = _require.pac;

	var _require2 = __webpack_require__(2);

	var store = _require2.store;

	var URL = 'http://s3-us-west-1.amazonaws.com/bn-configs/extentsion-v3';

	chrome.runtime.onMessage.addListener(function (request) {
	  if (request.indexOf('proxy') === -1) return;

	  var method = request.slice('proxy:'.length);

	  proxy[method]();
	});

	var proxy = {
	  enable: function enable() {
	    store.set('connecting', true);
	    fetch(URL + '?_=' + new Date().getTime()).then(function (response) {
	      return response.json();
	    }).then(function (response) {
	      // if it was set to false by .disable, i.e. cancel
	      if (!store.get('connecting')) return;

	      var config = response.vpn_config.free[0];

	      chrome.proxy.settings.set({
	        value: {
	          mode: 'pac_script',
	          pacScript: {
	            data: pac(config.http_address, true)
	          }
	        }
	      });

	      store.set('username', config.username);
	      store.set('password', config.password);

	      store.set('enabled', true);
	      chrome.runtime.sendMessage({ proxy: 'enabled' });
	      chrome.browserAction.setIcon({ path: 'img/shieldon-active.png' });

	      store.set('connecting', false);
	    }, function (err) {
	      alert('ERR + ' + err);
	      if (err.status === 0) {
	        chrome.runtime.sendMessage({ error: 'No internet connection' });
	      } else if (err.status >= 400) {
	        chrome.runtime.sendMessage({ error: err.status + ' - ' + err.statusText });
	      }
	    });
	  },
	  disable: function disable() {
	    chrome.proxy.settings.clear({
	      scope: 'regular'
	    });

	    store.set('connecting', false);
	    store.set('enabled', false);
	    chrome.browserAction.setIcon({ path: 'img/shieldon-deactive.png' });

	    chrome.runtime.sendMessage({ proxy: 'disabled' });
	  },
	  status: function status() {
	    var response = undefined;
	    if (store.get('connecting')) {
	      response = 'connecting';
	    } else {
	      response = store.get('enabled') ? 'enabled' : 'disabled';
	    }
	    chrome.runtime.sendMessage({ status: response });
	  }
	};

	proxy.disable();


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports.pac = function pac(address, chrome) {
	  function FindProxyForURL(url, host) {
	    if (isPlainHostName(host) || isInNet(dnsResolve(host), "127.0.0.0", "127.0.0.255") || isInNet(dnsResolve(host), "10.0.0.0", "10.0.0.255") || isInNet(dnsResolve(host), "172.16.0.0", "172.16.255.255") || isInNet(dnsResolve(host), "192.168.0.0", "192.168.255.255") || shExpMatch(url, "https://s3-us-west-1.amazonaws.com/bn-configs/extension_ping/direct") || shExpMatch(url, "https://s3.amazonaws.com/*") || shExpMatch(url, "https://betternet-backend.herokuapp.com/*")) {
	      return 'DIRECT';
	    }

	    return 'PROXY $http$';
	  }

	  var fn = FindProxyForURL.toString().replace('$http$', address);

	  if (chrome) return fn;
	  return 'data:text/javascript,' + encodeURIComponent(fn);
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	module.exports = { store: {
	    set: function set(key, value) {
	      if (typeof value === 'object') {
	        value = JSON.stringify(value);
	      }

	      localStorage.setItem(key, value);
	    },

	    get: function get(key) {
	      var result = localStorage.getItem(key);

	      try {
	        result = JSON.parse(result);
	      } catch (e) {}

	      if (!isNaN(parseFloat(result))) {
	        result = parseFloat(result);
	      }

	      if (result === 'false') result = false;
	      if (result === 'true') result = true;

	      return result;
	    }
	  } };


/***/ }
/******/ ]);