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
    chrome.tabs.executeScript(null, {code: "localStorage.setItem('hideMedals', " + temp + ");"});
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
    chrome.tabs.executeScript(null, {code: "localStorage.setItem('hideSignature', " + temp + ");"});
});

///////////////////////
// block user groups //
///////////////////////
var blockUserGroups = document.getElementById("blockUserGroups");
var blockUserGroupsChecked = localStorage.getItem("blockUserGroups");
var userGroups = document.getElementById("userGroups");
var userGroupsSelected = localStorage.getItem("userGroups");
// null == 0
if(Number(userGroupsSelected) >= 0 && Number(userGroupsSelected) <= 6) {
    $("option", userGroups)[Number(userGroupsSelected)].selected = true;
}
if(blockUserGroupsChecked == "true") {
    blockUserGroups.checked = true;
    userGroups.disabled = false;
}
else {
    blockUserGroups.checked = false;
    userGroups.disabled = true;
}
$("#blockUserGroups").click(function() {
    var temp;
    if(blockUserGroups.checked) {
        userGroups.disabled = false;
        temp = "true";
    }
    else {
        userGroups.disabled = true;
        temp = "false";
    }
    localStorage.setItem("blockUserGroups", temp);
    chrome.tabs.executeScript(null, {code: "localStorage.setItem('blockUserGroups', " + temp + ");"});
});

$("#userGroups").change(function() {
    localStorage.setItem("userGroups", userGroups.selectedIndex);
    chrome.tabs.executeScript(null, {code: "localStorage.setItem('userGroups', " + userGroups.selectedIndex + ");"});
});