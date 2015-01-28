///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// block specific users' threads and the threads that have specific keywords //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes) {
            [].slice.call(mutation.addedNodes).forEach(function(node) {
                if(node.nodeName.toLowerCase() == "tr" && node.children.length == 5) {
                    if(!node.hasAttribute("class") && node.innerText != "" && node.children[1].nodeName.toLowerCase() == "th") {
                        var curTopic = $(".s.xst", node).get(0).innerHTML;
                        var curUsername = $("cite", node).get(0).children[0].innerHTML;
                        for(var i = 0; i < localStorage.count; i++) {
                            var item = JSON.parse(localStorage.getItem("BlackList" + i));
                            if(item.type == "username") {
                                if(item.value == curUsername) {
                                    $(node.parentElement).hide();
                                    break;
                                }
                            }
                            if(item.type == "key") {
                                if(curTopic.toLowerCase().indexOf(item.value) >= 0) {
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
    subtree:   true
});
