chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(tab.url != "http://bbs.sgamer.com/forum-44-1.html")
        return;
    if(changeInfo.status == "loading"){
        chrome.tabs.executeScript(tabId, {code: "localStorage.setItem('count', " + localStorage.count + ");"});
        for(var i = 0; i < localStorage.count; i++) {
            var temp = localStorage.getItem("BlackList" + i);
            chrome.tabs.executeScript(tabId, {code: "localStorage.setItem('BlackList" + i + "', '" + temp + "');"});
        }
        chrome.tabs.executeScript(tabId, {file: "js/modifyPage.js"});
    }
    if(changeInfo.status == "complete"){
        chrome.tabs.executeScript(tabId, {code: "localStorage.setItem('count', " + localStorage.count + ");"});
        for(var i = 0; i < localStorage.count; i++) {
            var temp = localStorage.getItem("BlackList" + i);
            chrome.tabs.executeScript(tabId, {code: "localStorage.setItem('BlackList" + i + "', '" + temp + "');"});
        }
        chrome.tabs.executeScript(tabId, {file: "js/modifyPage.js"});
    }
});