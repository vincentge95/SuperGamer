


chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var extensionId = chrome.runtime.id;
        if( details.url == "http://bbs.sgamer.com/data/cache/common_smilies_var.js?bVd" ) {
            return {redirectUrl: "chrome-extension://" + extensionId + "/js/ExtraEmotionVar.js?bVd"};
        }
        if( details.url == "http://bbs.sgamer.com/static/js/smilies.js?bVd") {
            return {redirectUrl: "chrome-extension://" + extensionId + "/js/ExtraEmotion.js?bVd"};
        }
        if(details.url == "http://bbs.sgamer.com/static/js/bbcode.js?bVd") {
            return {redirectUrl: "chrome-extension://" + extensionId + "/js/bbcode.js?bVd"};
        }
    },
    {urls: ["http://bbs.sgamer.com/data/cache/common_smilies_var.js?bVd", "http://bbs.sgamer.com/static/js/smilies.js?bVd", "http://bbs.sgamer.com/static/js/bbcode.js?bVd"]},
    ["blocking"]
);


function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf("http://bbs.sgamer.com/") == 0) {
        chrome.pageAction.show(tabId);
        if(changeInfo.status == "loading") {
            chrome.tabs.executeScript(tabId, {code: "localStorage.clear();"});
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                chrome.tabs.executeScript(tabId, {code: "localStorage.setItem('" + key + "', '" + value + "');"});
            }
        }
    }
};
chrome.tabs.onUpdated.addListener(checkForValidUrl);