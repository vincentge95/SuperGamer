// Supply functions for huya.com

var node = document.getElementById("flashRoomObj");
var url = node.getAttribute("data");
node = document.getElementsByClassName("host-spectator")[0];
var code = "<a href='" + url + "' target='_self' class='host-spl' style='margin-left: 15px;'>网页全屏</a>";
$(node).after(code);

