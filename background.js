
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // Redirect js of bbs.sgamer.com to ext's.
        var extensionId = chrome.runtime.id;
        if(details.url.indexOf("http://bbs.sgamer.com/data/cache/common_smilies_var.js") == 0) {
            var param = "";
            for(var i = 0; i < details.url.length; i++) {
                if(details.url[i] == '?') {
                    for(var j = i; j < details.url.length; j++) {
                        param += details.url[j];
                    }
                    break;
                }
            }
            return {redirectUrl: "chrome-extension://" + extensionId + "/js/ExtraEmotionVar.js" + param};
        }
        // Redirect js of bbs.sgamer.com to ext's.
        if(details.url.indexOf("http://bbs.sgamer.com/static/js/smilies.js") == 0) {
            var param = "";
            for(var i = 0; i < details.url.length; i++) {
                if(details.url[i] == '?') {
                    for(var j = i; j < details.url.length; j++) {
                        param += details.url[j];
                    }
                    break;
                }
            }
            return {redirectUrl: "chrome-extension://" + extensionId + "/js/ExtraEmotion.js" + param};
        }
        // Redirect js of bbs.sgamer.com to ext's.
        if(details.url.indexOf("http://bbs.sgamer.com/static/js/bbcode.js") == 0) {
            var param = "";
            for(var i = 0; i < details.url.length; i++) {
                if(details.url[i] == '?') {
                    for(var j = i; j < details.url.length; j++) {
                        param += details.url[j];
                    }
                    break;
                }
            }
            return {redirectUrl: "chrome-extension://" + extensionId + "/js/bbcode.js" + param};
        }
    },
    {urls: ["http://bbs.sgamer.com/data/cache/common_smilies_var.js*", "http://bbs.sgamer.com/static/js/smilies.js*", "http://bbs.sgamer.com/static/js/bbcode.js*"]},
    ["blocking"]
);

// Return localStorage to the querying page.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //console.log(request.method);
        if (request.method == "getLocalStorage")
            sendResponse(localStorage.getItem(request.key));
    }
);

/*
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'Cookie') {
                details.requestHeaders.splice(i, 1);
                break;
            }
        }
        return {requestHeaders: details.requestHeaders};
    },
    {urls: ["http://c1.web.yystatic.com/*"]},
    ["blocking", "requestHeaders"]
);
*/
// Show pageAction.
function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf("http://bbs.sgamer.com/") == 0) {
        chrome.pageAction.show(tabId);
    }
};
chrome.tabs.onUpdated.addListener(checkForValidUrl);
