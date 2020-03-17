var modal = document.getElementById('id01');
var modalR = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalR) {
        modal.style.display = "none";
    }  else if (event.target == modalR) {
        modalR.style.display = "none";
    }
}
