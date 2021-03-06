


function getParam(link)
{
    var param = "";
    for(var i = 0; i < link.length; i++) {
        if(link[i] == '?') {
            for(var j = i; j < link.length; j++) {
                param += link[j];
            }
            break;
        }
    }
    return param;
}

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // Redirect js of bbs.sgamer.com to ext's.
        var extensionId = chrome.runtime.id;
        if(details.url.indexOf("http://bbs.sgamer.com/data/cache/common_smilies_var.js") == 0) {
            var param = getParam(details.url);
            return {redirectUrl: "chrome-extension://" + extensionId + "/js/ExtraEmotionVar.js" + param};
        }
        // Redirect js of bbs.sgamer.com to ext's.
        if(details.url.indexOf("http://bbs.sgamer.com/static/js/smilies.js") == 0) {
            var param = getParam(details.url);
            return {redirectUrl: "chrome-extension://" + extensionId + "/js/ExtraEmotion.js" + param};
        }
        // Redirect js of bbs.sgamer.com to ext's.
        if(details.url.indexOf("http://bbs.sgamer.com/static/js/bbcode.js") == 0) {
            var param = getParam(details.url);
            return {redirectUrl: "chrome-extension://" + extensionId + "/js/bbcode.js" + param};
        }
        // Redirect js of bbs.sgamer.com to ext's.
        if(details.url.indexOf("http://bbs.sgamer.com/static/js/editor.js") == 0) {
            var param = getParam(details.url);
            return {redirectUrl: "chrome-extension://" + extensionId + "/js/editor.js" + param};
        }
    },
    {urls: [
        "http://bbs.sgamer.com/data/cache/common_smilies_var.js*",
        "http://bbs.sgamer.com/static/js/smilies.js*",
        "http://bbs.sgamer.com/static/js/bbcode.js*",
        "http://bbs.sgamer.com/static/js/editor.js*"
    ]},
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

// Show pageAction.
function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf("http://bbs.sgamer.com/") == 0) {
        chrome.pageAction.show(tabId);
        if(changeInfo.status == "complete") {
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                chrome.tabs.executeScript(tabId, {code: "localStorage.setItem('" + key + "', '" + value + "');"});
            }
        }
    }
};
chrome.tabs.onUpdated.addListener(checkForValidUrl);
