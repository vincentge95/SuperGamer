chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url.indexOf("http://bbs.sgamer.com/forum-") == 0) {
        if (changeInfo.status == "complete") {
            chrome.tabs.executeScript(tabId, {code: "localStorage.setItem('count', " + localStorage.count + ");"});
            for (var i = 0; i < localStorage.count; i++) {
                var temp = localStorage.getItem("BlackList" + i);
                chrome.tabs.executeScript(tabId, {code: "localStorage.setItem('BlackList" + i + "', '" + temp + "');"});
            }
            chrome.tabs.executeScript(tabId, {file: "js/modifyForum.js"});
        }
    }
});