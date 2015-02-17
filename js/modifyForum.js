// Block specific users' threads and the threads that have specific keywords.

// Get all block information from ext's localStorage.
var blockInfo = new Array();
chrome.runtime.sendMessage({method: "getLocalStorage", key: "count"}, function (count) {
    for(var i = 0; i < count; i++) {
        chrome.runtime.sendMessage({method: "getLocalStorage", key: "BlackList" + i}, function (item) {
            blockInfo.push(item);
        });
    }
});
// Handle DOMs.
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes) {
            [].slice.call(mutation.addedNodes).forEach(function (node) {
                // It is a post thread.
                if (node.nodeName.toLowerCase() == "tr" && node.children.length == 5) {
                    if (!node.hasAttribute("class") && node.innerText != "" && node.children[1].nodeName.toLowerCase() == "th") {
                        // Get topic and username of the thread.
                        var curTopic = $(".s.xst", node).get(0).innerHTML;
                        var curUsername = $("cite", node).get(0).children[0].innerHTML;
                        for (var i = 0; i < blockInfo.length; i++) {
                            var item = JSON.parse(blockInfo[i]);
                            if (item.type == "username") {
                                // If the thread is posted by specific users.
                                if (item.value == curUsername) {
                                    $(node.parentElement).hide();
                                    break;
                                }
                            }
                            if (item.type == "key") {
                                // If the thread has specific keywords.
                                if (curTopic.toLowerCase().indexOf(item.value) >= 0) {
                                    $(node.parentElement).hide();
                                    break;
                                }
                            }
                        }
                    }
                }
            });
        }
    });
});


observer.observe(document, {
    childList: true,
    subtree: true
});
