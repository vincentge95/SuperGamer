// Block specific users' threads and the threads that have specific keywords.
// Add additional spaces at the end of submitting post.



// count bytes of str
function getByteCount(str) {
    var ret = 0, len = str.length;
    for(var i = 0; i < len; i++) {
        if(str.charCodeAt(i) > 255) {
            ret += 2;
        }
        else {
            ret++;
        }
    }
    return ret;
}

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
                        for (var i = 0; i < localStorage.count; i++) {
                            var item = JSON.parse(localStorage.getItem("BlackList" + i));
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
                // Hide Zhanqitv banner at forum head.
                if(localStorage.hideZhanqiBanner == "true") {
                    if (node.nodeName.toLowerCase() == "iframe") {
                        var src = node.getAttribute("src");
                        if (src.indexOf("zhanqi.tv") >= 0) {
                            $(node).hide();
                        }
                    }
                }
                // Add additional spaces;
                if(node.nodeName.toLowerCase() == "button") {
                    if(node.hasAttribute("id") && node.getAttribute("id") == "fastpostsubmit") {
                        $(node).click(function() {
                            var post = document.getElementById("fastpostmessage");
                            var count = 10 - getByteCount(post.value);
                            for(var i = 0; i < count; i++) {
                                post.value += " ";
                            }
                        });
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
