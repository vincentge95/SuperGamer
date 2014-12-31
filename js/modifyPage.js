var table = document.getElementById("threadlisttableid");
for(var id = 0; id < localStorage.count; id++) {
    var item = JSON.parse(localStorage.getItem("BlackList" + id));
    for (var i = 0; i < table.rows.length; i++) {
        if (table.rows[i].getAttribute("class") == "ts")
            continue;
        if (item.type == "username") {
            var curUsername = table.rows[i].cells[2].childNodes[1].childNodes[1].innerHTML;
            console.log(curUsername);
            var username = item.value;
            if (username == curUsername) {
                //table.rows[i].parentNode.setAttribute("hidden", "true");
                var x = table.rows[i].parentNode;
                console.log(x);
                x.remove();
                i--;
            }
        }
    }
    localStorage.removeItem("BlackList" + id);
}
localStorage.removeItem("count");
if(table.tBodies.length > 0 && table.tBodies[0].getAttribute("id") == "separatorline"){
    table.tBodies[0].remove();
}