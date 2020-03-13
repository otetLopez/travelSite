window.onscroll = function() {myFunction()};

var header = document.getElementById("navcontainer");
console.log("Header-->" + header.offsetTop);
var sticky = header.offsetTop;

function myFunction() {
  console.log("Scrolling with offset " + window.pageYOffset);
  if (window.pageYOffset > sticky) {
    console.log("Adding");
    header.classList.add("sticky");
  } else {
    console.log("Removing");
    header.classList.remove("sticky");
  }
}
