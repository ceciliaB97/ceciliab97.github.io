init();

function init() {
    showProfInfo();
}
function showPersInfo() {
    //buttons
    profBtn.enabled = true;
    profBtn.style.backgroundColor = "#FFFFFF";
    persBtn.enabled = false;
    persBtn.style.backgroundColor = "#808080";
    //divs
    profDiv.style.display = "none";
    persDiv.style.display = "block";
}

function showProfInfo() {
    //buttons
    profBtn.enabled = false;
    profBtn.style.backgroundColor = "#808080";
    persBtn.enabled = true;
    persBtn.style.backgroundColor = "#FFFFFF";
    //divs
    profDiv.style.display = "block";
    persDiv.style.display = "none";
}