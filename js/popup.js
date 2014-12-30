document.write("<table id = 'BlackList' border = '1'>");
if (localStorage.count) {
    for (var i = 0; i < localStorage.count; i++) {
        var info = JSON.parse(localStorage.getItem("BlackList" + i));
        document.write("<tr>");
        document.write("<td>" + i + "</td>");
        document.write("<td>" + info.value + "</td>");
        document.write("<td>" + info.type + "</td>");
        document.write("<td><input type = 'button' value = '删除' class = 'deleteInfo'></td>");
        document.write("</tr>");
    }
}
document.write("</table>");
function addInfo(type) {
    var value = document.getElementById("value").value;
    if (value.length == 0) {
        alert("输入不能为空");
        return;
    }
    if (!localStorage.count) {
        localStorage.count = 1;
    }
    else {
        localStorage.count = Number(localStorage.count) + 1;
    }
    var info = {value: value, type: type};
    var id = Number(localStorage.count) - 1;
    localStorage.setItem("BlackList" + id, JSON.stringify(info));
    var row = document.getElementById("BlackList").insertRow(id);
    row.insertCell(0).innerHTML = id;
    row.insertCell(1).innerHTML = value;
    row.insertCell(2).innerHTML = type;
    row.insertCell(3).innerHTML = "<input type = 'button' value = '删除' class = 'deleteInfo'>";
}
function deleteInfo(r) {
    var row = r.parentNode.parentNode.rowIndex;
    for (var i = row; i < Number(localStorage.count) - 1; i++) {
        localStorage.setItem("BlackList" + i, localStorage.getItem("BlackList" + (Number(i) + 1)));
        var x = document.getElementById("BlackList").rows[Number(i) + 1].cells[0];
        x.innerHTML = i;
    }
    localStorage.removeItem("BlackList" + (Number(localStorage.count) - 1));
    localStorage.count = Number(localStorage.count) - 1;
    document.getElementById("BlackList").deleteRow(row);
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
$(".deleteInfo").click(function () {
    deleteInfo(this);
})
