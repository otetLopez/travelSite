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

$(document).on('click', '#forgot', function( event ) {
   console.log("The user forgot password");
   alert("Sorry " + $('#unameLog').val() + ".  I don't have time to support this.  You shouldn't be forgetting your password.");
});

$(document).ready(function () {
  console.log("Register");
  var status = document.getElementById('login').innerHTML;
  var loggedUser = "undefined";
  var i = 0;
  var usrIdx = 0;
    // retrieveUsers();
  var idNum = localStorage.length + localStorage.getItem("maxID");
  for (i = 0; i <= idNum; i++) {
    var usrID = "usr-" + i;
    var pwdID = "psw-" + i;
    var currUsr = localStorage.getItem(usrID);
    var currPwd = localStorage.getItem(pwdID);
    if(currUsr !== null) {
      usrIdx = i;
      console.log("Retrieved user: " + currUsr + "; " + currPwd);
    }
  }

  i = localStorage.getItem("maxID");

  // Let us find out if a user is currently logged on
  loggedUser = localStorage.getItem("currUser");
  if(loggedUser !== null && (loggedUser.localeCompare("undefined") !== 0)) {
    console.log("A user is logged on: " + loggedUser);
    document.getElementById('login').innerHTML = "Sign Out";
  } else {
    loggedUser = "undefined";
  }


  $("button").click(function(){
    console.log("Button Clicked");
    status = document.getElementById('login').innerHTML;
    console.log("Current Status is " + status);

    if($(this).attr('id') !== undefined) {
      var id = $(this).attr('id');
      console.log("This is the ID : " + id);
      if(id.localeCompare("log01") === 0) {
        console.log("Logging In :" + status);
        var uname =  $('#unameLog').val();
        var pwd =  $('#pswLog').val();
        if(uname !== "" && pwd !== "") {
          if(checkCredentials(uname, pwd) === true) {
            alert("You are successfully logged");
            localStorage.setItem("currUser", uname);
            document.getElementById('login').innerHTML="Sign Out";
            clearFields();
            dismissForm();
          } else {
            alert("Please check if inputted user or pasword is correct.");
          }
        } else {
          alert("Please complete filling the fields");
        }
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
            alert("Just Kidding! Just input password at least length of 6");
          } else {
            var usrID = "usr-" + usrIdx;
            var pswID = "psw-" + usrIdx;
            localStorage.setItem(usrID, uname);
            localStorage.setItem(pswID, pwd);
            console.log("Total stored: " + localStorage.length);
            alert("Register Successful!  Please Log In.");
            usrIdx++;
            localStorage.setItem("maxID", parseInt(localStorage.getItem("maxID")) + 1);
            clearFields();
            dismissForm();
          }
        }
      } else if(id.localeCompare("login") === 0) {
          status = document.getElementById('login').innerHTML;
          if(status.localeCompare("Sign Out") === 0) {
            if(confirm("Are you sure you want to Sign out?")) {
              console.log("Signing out : " + status);
              localStorage.setItem("currUser", "undefined");
              document.getElementById('login').innerHTML="Log On"
              clearFields();
              dismissForm();
            }
          }
      }  else if(id.localeCompare("register") === 0) {
          status = document.getElementById('login').innerHTML;
          if(status.localeCompare("Sign Out") === 0) {
            alert("Sign out current user before registering new account");
            clearFields();
            dismissForm();
          }
      }
    }
  });
});

function checkCredentials(uname, pwd) {
  for (i = 0; i <= localStorage.length; i++) {
      var usrID = "usr-" + i;
      var currUsr = localStorage.getItem(usrID);
      if(currUsr !== null) {
        if(currUsr.localeCompare(uname) === 0) {
          var pwdID = "psw-" + i;
          var currPwd = localStorage.getItem(pwdID);
          console.log("Comparing " + currPwd + " vs " + pwd);
          if(currPwd !== null && currPwd.localeCompare(pwd) === 0) {
            return true;
          }
        }
      }
  }
  return false;
}

function checkUser(uname) {
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
  $('#unameLog').val("");
  $('#pswLog').val("");
}

function dismissForm() {
  document.getElementById("id01").style.display = 'none';
  document.getElementById("id02").style.display = 'none';
}
