////////////////////////////////////////////////////////////
//                                                        //
// block specific users' comments and replies in the thread //
//                                                        //
///////////////////////////////////////////////////////////


    var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes) {
            [].slice.call(mutation.addedNodes).forEach(function (node) {
                /////////////////////////////////////
                // remove specific users' comments //
                /////////////////////////////////////
                if (node.nodeName.toLowerCase() == "div") {
                    if (node.hasAttribute("class")) {
                        var className = node.getAttribute("class");
                        var curUsername = "-1.111";
                        if(className == "pstl xs1 cl") {
                            if(node.children.length == 2 && node.children[0].children.length == 2) {
                                curUsername = node.children[0].children[1].innerHTML;
                            }
                        }
                        if(className == "pstl") {
                            if(node.children.length == 2 && node.children[1].children.length == 2) {
                                curUsername = node.children[1].children[0].innerHTML;
                            }
                        }
                        if(curUsername != "-1.111") {
                            for (var i = 0; i < localStorage.count; i++) {
                                var item = JSON.parse(localStorage.getItem("BlackList" + i));
                                if (item.type == "username" && item.value == curUsername) {
                                    node.remove();
                                }
                            }
                        }
                    }
                }

                /////////////////////////////////////
                // remove specific users' replies //
                /////////////////////////////////////
                if(node.nodeName.toLowerCase() == "div") {
                    var curUsername = "-1.111";
                    if(node.hasAttribute("class") && node.getAttribute("class") == "authi" && node.children.length == 1) {
                        curUsername = node.children[0].innerHTML;
                    }
                    if(curUsername != "-1.111") {
                        for (var i = 0; i < localStorage.count; i++) {
                            var item = JSON.parse(localStorage.getItem("BlackList" + i));
                            if (item.type == "username" && item.value == curUsername) {
                                node.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();;
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
