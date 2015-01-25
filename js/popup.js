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

////////////////////
// hide signature //
////////////////////
var hideSignature = document.getElementById("hideSignature");
var hideSignatureChecked = localStorage.getItem("hideSignature");
if(hideSignatureChecked == "true") {
    hideSignature.setAttribute("checked", "");
}
else {
    hideSignature.removeAttribute("checked");
}
$("#hideSignature").click(function() {
   var temp;
    if(hideSignature.hasAttribute("checked")) {
        temp = "false";
    }
    else {
        temp = "true";
    }
    localStorage.setItem("hideSignature", temp);
    chrome.tabs.executeScript(null, {code: "localStorage.setItem('hideSignature', " + localStorage.hideSignature + ");"});
});