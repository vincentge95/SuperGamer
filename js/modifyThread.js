///////////////////////////////////////////////////////////////
//                                                           //
// block specific users' comments and replies in the thread  //
// block specific users groups' replies                      //
// hide medals and signatures                                //
//                                                           //
///////////////////////////////////////////////////////////////


var userGroupsUrl = [
    "home.php?mod=spacecp&ac=usergroup&gid=10",
    "home.php?mod=spacecp&ac=usergroup&gid=11",
    "home.php?mod=spacecp&ac=usergroup&gid=12",
    "home.php?mod=spacecp&ac=usergroup&gid=13",
    "home.php?mod=spacecp&ac=usergroup&gid=14",
    "home.php?mod=spacecp&ac=usergroup&gid=15",
    "home.php?mod=spacecp&ac=usergroup&gid=20"
];


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
                                    $(node).hide();
                                    break;
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
                                $(node.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement).hide();;
                                break;
                            }
                        }
                    }
                }

                /////////////////////////////////////////
                // block specific user groups' replies //
                /////////////////////////////////////////
                if(localStorage.blockUserGroups == "true") {
                    if(node.nodeName.toLowerCase() == "a" && node.hasAttribute("href")) {
                        var href = node.getAttribute("href");
                        if(href.indexOf("home.php?mod=spacecp&ac=usergroup&gid") == 0) {
                            if(node.children.length > 0) {
                                var dom = $("a[onclick=\"setCopy(this.href, '帖子地址复制成功');return false;\"]", node.parentElement.parentElement.parentElement.parentElement).get(0)
                                // do not remove the host of thread.`   1`1`1
                                if(dom != undefined && dom.innerText != "楼主") {
                                    for (var i = 0; i <= localStorage.userGroups; i++) {
                                        if (href == userGroupsUrl[i]) {
                                            $(node.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement).hide();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                /////////////////
                // hide medals //
                /////////////////
                if(localStorage.hideMedals == "true") {
                    if (node.nodeName.toLowerCase() == "p") {
                        if (node.hasAttribute("class") && node.getAttribute("class") == "md_ctrl") {
                            $(node).hide();
                        }
                    }
                }

                /////////////////////
                // hide signatures //
                /////////////////////
                if(localStorage.hideSignature == "true") {
                    if(node.nodeName.toLowerCase() == "div") {
                        if (node.hasAttribute("class") && node.getAttribute("class") == "sign"){
                            $(node).hide();
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
