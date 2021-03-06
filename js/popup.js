// Hide medals.
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
        hideMedals.removeAttribute("checked");
    }
    else {
        temp = "true";
        hideMedals.setAttribute("checked", "");
    }
    localStorage.setItem("hideMedals", temp);
    chrome.tabs.executeScript(null, {code: "localStorage.setItem('hideMedals', " + temp + ");"});
});


// Hide signature.
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
        hideSignature.removeAttribute("checked");
    }
    else {
        temp = "true";
        hideSignature.setAttribute("checked", "");
    }
    localStorage.setItem("hideSignature", temp);
    chrome.tabs.executeScript(null, {code: "localStorage.setItem('hideSignature', " + temp + ");"});
});

// Block specific user groups.
var blockUserGroups = document.getElementById("blockUserGroups");
var blockUserGroupsChecked = localStorage.getItem("blockUserGroups");
var userGroups = document.getElementById("userGroups");
var userGroupsSelected = localStorage.getItem("userGroups");
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
// blockUserGroups.checked will modify automatically.
$("#blockUserGroups").click(function() {
    var temp;
    if(blockUserGroups.checked) {
        temp = "true";
        userGroups.disabled = false;
    }
    else {
        temp = "false";
        userGroups.disabled = true;
    }
    localStorage.setItem("blockUserGroups", temp);
    chrome.tabs.executeScript(null, {code: "localStorage.setItem('blockUserGroups', " + temp + ");"});
});

$("#userGroups").change(function() {
    localStorage.setItem("userGroups", userGroups.selectedIndex);
    chrome.tabs.executeScript(null, {code: "localStorage.setItem('userGroups', " + userGroups.selectedIndex + ");"});
});

// Hide zhanqitv banner at forum head.
var hideZhanqiBanner = document.getElementById("hideZhanqiBanner");
var hideZhanqiBannerChecked = localStorage.getItem("hideZhanqiBanner");
if(hideZhanqiBannerChecked == "true") {
    hideZhanqiBanner.setAttribute("checked", "");
}
else {
    hideZhanqiBanner.removeAttribute("checked");
}
$("#hideZhanqiBanner").click(function() {
    var temp;
    if(hideZhanqiBanner.hasAttribute("checked")) {
        temp = "false";
        hideZhanqiBanner.removeAttribute("checked");
    }
    else {
        temp = "true";
        hideZhanqiBanner.setAttribute("checked", "");
    }
    localStorage.setItem("hideZhanqiBanner", temp);
    chrome.tabs.executeScript(null, {code: "localStorage.setItem('hideZhanqiBanner', " + temp + ");"});
});