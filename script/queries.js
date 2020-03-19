$(document).ready(function () {
  console.log("Entering Query");
    var i = 0;
    for (i = 0; i <= localStorage.length; i++) {
        var reqID = "req-" + i;
        if(localStorage.getItem(reqID) !== null) {
          $('#requestList').append("<li id='" + reqID + "'>" + localStorage.getItem(reqID) + "</li>");
      }
    }
    $('#clear').click(function () {
        localStorage.clear();
    });
    $('#book_form').submit(function () {
      console.log("Submitting details");
        if ($('#taskInput').val() !== "") {
            var taskID = "task-" + i;
            var taskMessage = $('#taskInput').val();
            localStorage.setItem(taskID, taskMessage);
            $('#taskList').append("<li class='task' id='" + taskID + "'>" + taskMessage + "</li>");
            var task = $('#' + taskID);
            task.css('display', 'none');
            task.slideDown();
            $('#taskInput').val("");
            i++;
        }
        return false;
    });

    $('#requestList').on("click", "li", function (event) {
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
      var id = $(this).attr('id');
      var reqID = "";
      var checkIn = "";
      var checkOut = "";
      var guests = "";
      var room = "";
      reqID = "req-" + i;
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
      }

      if(checkIn !== "" && checkOut !== "" && guests !== "" && isBook === true) {
        var fullRequest = id + ": " + "Check-In Date: " + checkIn + ", Check-Out Date: " + checkOut;
        fullRequest = fullRequest + ", Guest: " + guests + ", Room Type: " + room;
        console.log("Requesting --> " + fullRequest);

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
    });
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
