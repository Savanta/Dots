(function ($) {
    chrome.extension.sendRequest({"urlName": window.location.href},
        function (response) {
            if (response.canRunOnCurrentUrl === true && document.location.href.toLowerCase().indexOf("es=off") === -1) {
                $("body").eliminatorSlajdow({
                    imageBaseUrl: chrome.extension.getURL("images/"),
                    trackingCallback: function (category, action, location) {
                        chrome.extension.sendRequest({"tracking": category, "action": action, "location": location});
                    },
                    debug: (document.location.href.indexOf("es=debug") > -1),
                    version: response.version + "-chrome"
                });
            }
        });
})(jQuery.noConflict(true));
