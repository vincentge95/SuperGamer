function modifyComments() {
    var table = document.getElementById("postlist");
    var temp = table.children[2].children[0];
    if(temp.getAttribute("id") == "threadstamp") {
        temp = table.children[2].children[1];
    }
    temp = temp.children[0].children[0].children[1].children[1].children[1].children[1];
    for (var id = 0; id < localStorage.count; id++) {
        var item = JSON.parse(localStorage.getItem("BlackList" + id));
        for (var i = 1; i < temp.children.length - 1; i++) {
            var curUsername = temp.children[i].children[1].children[0].innerHTML;
            if(item.type == "username" && item.value == curUsername){
                temp.children[i].remove();
                i--;
            }
        }
    }
}
var table = document.getElementById("postlist");
for (var id = 0; id < localStorage.count; id++) {
    var item = JSON.parse(localStorage.getItem("BlackList" + id));
    for (var i = 0; i < table.children.length; i++) {
        if(!table.children[i].hasAttribute("id"))
            continue;
        if(table.children[i].getAttribute("id").indexOf("post") != 0 || table.children[i].getAttribute("id") == "postlistreply")
            continue;
        var curUsername;
        var temp = table.children[i].children[0];
        if(temp.getAttribute("id") == "threadstamp") {
            temp = table.children[i].children[1];
        }
        temp = temp.children[0].children[0].children[0].children[0];
        if(temp.children[0].hasAttribute("name")) {
            curUsername = temp.children[1].children[0].children[0].innerHTML;
        }
        else {
            curUsername = temp.children[0].children[0].children[0].innerHTML;
        }
        if (item.type == "username") {
            var username = item.value;
            if (username == curUsername) {
                table.children[i].remove();
                i--;
            }
        }
    }
}
temp = table.children[2].children[0];
if(temp.getAttribute("id") == "threadstamp") {
    temp = table.children[2].children[1];
}
temp = temp.children[0].children[0].children[1].children[1].children[1].children[1];
for (id = 0; id < localStorage.count; id++) {
    item = JSON.parse(localStorage.getItem("BlackList" + id));
    for (i = 1; i < temp.children.length - 1; i++) {
        curUsername = temp.children[i].children[0].children[1].innerHTML;
        if(item.type == "username" && item.value == curUsername){
            temp.children[i].remove();
            i--;
        }
    }
}
temp = table.children[2].children[0];
if(temp.getAttribute("id") == "threadstamp") {
    temp = table.children[2].children[1];
}
temp = temp.children[0].children[0].children[1].children[1].children[1].children[1];
temp.onclick = function () {
    modifyComments();
};
temp.onmousemove = function () {
    modifyComments();
};
