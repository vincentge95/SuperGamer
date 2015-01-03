var table = document.getElementById("threadlisttableid");
for (var id = 0; id < localStorage.count; id++) {
    var item = JSON.parse(localStorage.getItem("BlackList" + id));
    for (var i = 0; i < table.rows.length; i++) {
        if (table.rows[i].hasAttribute("class") && table.rows[i].getAttribute("class") == "ts")
            continue;
        if (item.type == "username") {
            var curUsername = table.rows[i].cells[2].childNodes[1].childNodes[1].innerHTML;
            var username = item.value;
            if (username == curUsername) {
                var x = table.rows[i].parentNode;
                x.remove();
                i--;
            }
        }
        if (item.type == "key") {
            var threadTopic = table.rows[i].cells[1].childNodes[7].innerHTML;
            threadTopic = threadTopic.toLowerCase();
            if(threadTopic.indexOf(item.value) >= 0) {
                var x = table.rows[i].parentNode;
                x.remove();
                i--;
            }
        }
    }
}
if (table.tBodies.length > 0 && table.tBodies[0].getAttribute("id") == "separatorline") {
    table.tBodies[0].remove();
}