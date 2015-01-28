


chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if( details.url == "http://bbs.sgamer.com/data/cache/common_smilies_var.js?bVd" ) {
            return {redirectUrl: "chrome-extension://kekbjbpfgbhalenooagmiicnpkaocdcb/js/ExtraEmotionVar.js?bVd"};
        }
        if( details.url == "http://bbs.sgamer.com/static/js/smilies.js?bVd") {
            return {redirectUrl: "chrome-extension://kekbjbpfgbhalenooagmiicnpkaocdcb/js/ExtraEmotion.js?bVd"};
        }
        if(details.url == "http://bbs.sgamer.com/static/js/bbcode.js?bVd") {
            return {redirectUrl: "chrome-extension://kekbjbpfgbhalenooagmiicnpkaocdcb/js/bbcode.js?bVd"};
        }
    },
    {urls: ["http://bbs.sgamer.com/data/cache/common_smilies_var.js?bVd", "http://bbs.sgamer.com/static/js/smilies.js?bVd", "http://bbs.sgamer.com/static/js/bbcode.js?bVd"]},
    ["blocking"]
);


function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf("http://bbs.sgamer.com/") == 0) {
        chrome.pageAction.show(tabId);
    }
};
chrome.tabs.onUpdated.addListener(checkForValidUrl);