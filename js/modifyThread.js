var table = document.getElementById("postlist");
for (var id = 0; id < localStorage.count; id++) {
    var item = JSON.parse(localStorage.getItem("BlackList" + id));
    for (var i = 0; i < table.children.length; i++) {
        if(!table.children[i].hasAttribute("id"))
            continue;
        if(table.children[i].getAttribute("id").indexOf("post") != 0 || table.children[i].getAttribute("id") == "postlistreply")
            continue;
        var curUsername;
        var temp = table.children[i].children[0].children[0].children[0].children[0].children[0];
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
    localStorage.removeItem("BlackList" + id);
}