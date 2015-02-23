// Show blacklist, add users and keywords, delete users and keywords.


// Table to show blacklist.
document.write("<table id = 'BlackList' class = 'table table-bordered'>");
document.write("<tr>");
document.write("<td>文本</td>");
document.write("<td>类型</td>");
document.write("<td><input type = 'button' value = '删除' class = 'deleteInfo' hidden></td>");
document.write("</tr>");
if (localStorage.count) {
    for (var i = 0; i < localStorage.count; i++) {
        var info = JSON.parse(localStorage.getItem("BlackList" + i));
        document.write("<tr>");
        document.write("<td>" + info.value + "</td>");
        if (info.type == "username") {
            info.type = "用户名"
        }
        else {
            info.type = "关键字";
        }
        document.write("<td>" + info.type + "</td>");
        document.write("<td><input type = 'button' value = '删除' class = 'deleteInfo btn btn-xs btn-danger'></td>");
        document.write("</tr>");
    }
}
document.write("</table>");

// Add a new user or keyword depends on parameter 'type'.
function addInfo(type) {
    // Remove spaces at begining and end.
    var value = $.trim(document.getElementById("value").value);
    // Reset input.
    document.getElementById("value").value = "";
    // Keyword is not case-sensitive.
    if (type == "key") {
        value = value.toLowerCase();
    }
    if (value.length == 0) {
        return;
    }
    // localStorage.count is null.
    if (!localStorage.count) {
        localStorage.count = 1;
    }
    else {
        localStorage.count = Number(localStorage.count) + 1;
    }
    var info = {value: value, type: type};
    info = JSON.stringify(info);
    var id = Number(localStorage.count) - 1;
    // Write into localStorage of ext and bbs.sgamer.com.
    localStorage.setItem("BlackList" + id, info);
    chrome.tabs.executeScript(null, {code: "localStorage.setItem('count', " + localStorage.count + ");"});
    chrome.tabs.executeScript(null, {code: "localStorage.setItem('BlackList" + id + "', '" + info + "');"});;
    // Add a new line to show new information.
    var row = document.getElementById("BlackList").insertRow(Number(id) + 1);
    row.insertCell(0).innerHTML = value;
    if (type == "username") {
        row.insertCell(1).innerHTML = "用户名";
    }
    else {
        row.insertCell(1).innerHTML = "关键字";
    }
    row.insertCell(2).innerHTML = "<input type = 'button' value = '删除' class = 'deleteInfo btn btn-xs btn-danger'>";

}

// Delete a user or keyword. Parameter 'r' is the delete button in table. 
function deleteInfo(r) {
    var row = r.parentNode.parentNode.rowIndex;
    // Use following information to cover that deleted.
    for (var i = Number(row) - 1; i < Number(localStorage.count) - 1; i++) {
        localStorage.setItem("BlackList" + i, localStorage.getItem("BlackList" + (Number(i) + 1)));
    }
    var id = (Number(localStorage.count) - 1);
    // Remove useless information in localStorage.
    localStorage.removeItem("BlackList" + id);
    localStorage.count = Number(localStorage.count) - 1;
    // Remove the row delete in table.
    document.getElementById("BlackList").deleteRow(row);
    // Rewrite localStorage in bbs.sgamer.com as before.
    chrome.tabs.executeScript(null, {code: "localStorage.setItem('count', " + localStorage.count + ");"});
        for (var i = 0; i < localStorage.count; i++) {
            var temp = localStorage.getItem("BlackList" + i);
            chrome.tabs.executeScript(null, {code: "localStorage.setItem('BlackList" + i + "', '" + temp + "');"});
    }
}
function addUser() {
    addInfo("username");
}
function addKey() {
    addInfo("key");
}
$("#addUser").click(function () {
    addUser();
});
$("#addKey").click(function () {
    addKey();
});
$("#BlackList").on("click", ".deleteInfo", function () {
    deleteInfo(this);
});
