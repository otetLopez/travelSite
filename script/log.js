var modal = document.getElementById('id01');
var modalR = document.getElementById('id02');
// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modalR) {
//         modal.style.display = "none";
//     }  else if (event.target == modalR) {
//         modalR.style.display = "none";
//     }
// };

$(document).ready(function () {
  console.log("Register");
    var i = 0;
    var usrIdx = 0;
    // retrieveUsers();
    for (usrIdx = 0; usrIdx <= localStorage.length; usrIdx++) {
      var usrID = "usr-" + usrIdx;
      var currUsr = localStorage.getItem(usrID);
      if(currUsr !== null) {
        console.log("Retrieved user: " + currUsr);
      }
    }

    $("button").click(function(){
      console.log("Button Clicked");
      if($(this).attr('id') !== undefined) {
        var id = $(this).attr('id');
        console.log("This is the ID : " + id);
        if(id.localeCompare("log01") === 0) {
          console.log("Logging In");
        } else if (id.localeCompare("log02") === 0) {
          console.log("User Registering");
          var uname =  $('#uname').val();
          var pwd =  $('#psw1').val();
          var cpwd =  $('#psw2').val();
          if(uname !== "" && pwd !== "" && cpwd !== "") {
            console.log(uname + ", " + pwd + ", " + cpwd);
            if(pwd.localeCompare(cpwd) !== 0) {
              alert("Passwords entered do not match!")
            } else if (checkUser(uname) === false) { //Should not do this here but i am so sleepy
              alert("Username already exist!  Try another username.")
            } else if (pwd.length < 6){
              alert("Sorry!  Your password must contain  a capital letter, two numbers, a symbol, an inspiring message, a spell, a gang sign, a heiroglyph and a blood of a virgin.")
            } else {
              var usrID = "usr-" + usrIdx;
              var pswID = "psw-" + usrIdx;
              localStorage.setItem(usrID, uname);
              localStorage.setItem(pswID, pwd);
              console.log("Total stored: " + localStorage.length);
              alert("Register Successful!  Please Log In.");
              usrIdx++;
              clearFields();
              dismissForm();
            }
          }
        }
      }
    });
});

function checkUser(uname) {

  // Displaying all registered users
  for (i = 0; i <= localStorage.length; i++) {
      var usrID = "usr-" + i;
      var currUsr = localStorage.getItem(usrID);
      if(currUsr !== null) {
        console.log("Retrieved user: " + currUsr);
      }
  }

  for (i = 0; i <= localStorage.length; i++) {
      var usrID = "usr-" + i;
      var currUsr = localStorage.getItem(usrID);
      if(currUsr !== null) {
        if(currUsr.localeCompare(uname) === 0) {
          return false;
        }
      }
  }
  return true;
}

function clearFields() {
  $('#uname').val("");
  $('#psw1').val("");
  $('#psw2').val("");
}

function dismissForm() {
  document.getElementById("id01").style.display = 'none';
  document.getElementById("id02").style.display = 'none';
}
