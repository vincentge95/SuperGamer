


chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
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


function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf("http://bbs.sgamer.com/") == 0) {
        chrome.pageAction.show(tabId);
    }
};
chrome.tabs.onUpdated.addListener(checkForValidUrl);