/////////////////
// hide medals //
/////////////////

var hideMedals = document.getElementById("hideMedals");
var hideMedalsChecked = localStorage.getItem("hideMedals");
if(hideMedalsChecked == "true") {
    hideMedals.setAttribute("checked", "");
}
else {
    hideMedals.removeAttribute("checked");
}
$("#hideMedals").click(function() {
    var temp;
    if(hideMedals.hasAttribute("checked")) {
        temp = "false";
    }
    else {
        temp = "true";
    }
    localStorage.setItem("hideMedals", temp);
    chrome.tabs.executeScript(null, {code: "localStorage.setItem('hideMedals', " + localStorage.hideMedals + ");"});
});
