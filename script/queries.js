$(document).ready(function () {
  console.log("Entering Query");
    let loggedUser = "undefined";
    var i = 0;

    // Let us find out if a user is currently logged on
    var element = document.getElementById("instruct");
    retrievedLoggedUser();

    $('#clear').click(function () {
        localStorage.clear();
    });

    $('#requestList').on("click", "li", function (event) {
      retrievedLoggedUser();
        self = $(this);
        reqID = self.attr('id');
        if(confirm("Are you sure you want to remove " + localStorage.getItem(reqID) + "?")) {
          localStorage.removeItem(reqID);
          self.slideUp('slow', function () {
              self.remove();
          });
        }
    });

    $("button").click(function(){
      retrievedLoggedUser();
      var id = $(this).attr('id');
      var reqID = "";
      var checkIn = "";
      var checkOut = "";
      var guests = "";
      var room = "";
      reqID = "req-" + loggedUser + "-" +i;
      var isBook = false;

      if(id.localeCompare("Shangri-La Hotel") === 0) {
        checkIn = $('#cIn0').val();
        checkOut = $('#cOut0').val();
        guests = $('#guests0').val();
        room = $('#room0').val();
        isBook = true;
      } else if(id.localeCompare("JPark Island Resort and Waterpark") === 0) {
        checkIn = $('#cIn1').val();
        checkOut = $('#cOut1').val();
        guests = $('#guests1').val();
        room = $('#room1').val();
        isBook = true
      } else if(id.localeCompare("Plantation Bay Resort and Spa") === 0) {
        checkIn = $('#cIn2').val();
        checkOut = $('#cOut2').val();
        guests = $('#guests2').val();
        room = $('#room2').val();
        isBook = true;
      } else {
        isBook = false;
        console.log("[QUERIES] Book should be false");
      }
      console.log("[QUERIES] Logged user is: " + loggedUser);
      if(loggedUser !== null && loggedUser.localeCompare("undefined") !== 0) {
        if(checkIn !== "" && checkOut !== "" && guests !== "" && isBook === true) {
          var fullRequest = id + ": " + "Check-In Date: " + checkIn + ", Check-Out Date: " + checkOut;
          fullRequest = fullRequest + ", Guest: " + guests + ", Room Type: " + room;
          console.log("Requesting --> " + reqID + ":" + fullRequest);

          localStorage.setItem(reqID, fullRequest);
          $('#requestList').append("<li class='request' id='" + reqID + "'>" + fullRequest + "</li>");
          var req = $('#' + reqID);
          req.css('display', 'none');
          req.slideDown();
          console.log("Total stored: " + localStorage.length);
          clearFields();
          i++;
        } else {
          if(isBook === true) {
            alert("Cannot Book Request.  Please complete all form fields");
          }
        }
      } else {
        if(isBook === true) {
          alert("Cannot Book Request.  Please Log In to your account or Register");
        }
      }
    });

    function retrievedLoggedUser() {
      document.getElementById("requestList").innerHTML = "";
      loggedUser = localStorage.getItem("currUser");
      console.log("[QUERIES] Logged user retrieved: " + loggedUser);
      element = document.getElementById("instruct");
      if(typeof(element) != 'undefined' && element != null){
        if(loggedUser !== null && (loggedUser.localeCompare("undefined") !== 0)) {
          console.log("Retrieving requests fo user: " + loggedUser);
          var requestFlag = false;
          for (i = 0; i <= localStorage.length; i++) {
              var reqID = "req-" + loggedUser + "-" +i;
              if(localStorage.getItem(reqID) !== null) {
                $('#requestList').append("<li id='" + reqID + "'>" + localStorage.getItem(reqID) + "</li>");
                requestFlag = true;
            }
          }
          if(requestFlag === true) {
            document.getElementById("instruct").innerHTML = "Click on item to remove from list";
          } else {
            document.getElementById("instruct").innerHTML = loggedUser + ", you have no saved requests.";
          }
        } else {
          document.getElementById("instruct").innerHTML = "Log In to view your requests."
        }
      }
    }
});


function clearFields() {
  $('#cIn0').val("");
  $('#cOut0').val("");
  $('#guests0').val("");
  $('#room0').val("Deluxe");

  $('#cIn1').val("");
  $('#cOut1').val("");
  $('#guests1').val("");
  $('#room1').val("Deluxe");

  $('#cIn2').val("");
  $('#cOut2').val("");
  $('#guests2').val("");
  $('#room2').val("Deluxe");
}
