$(document).ready(function () {
  console.log("Entering Query");
    var i = 0;
    for (i = 0; i < localStorage.length; i++) {
        var reqID = "req-" + i;
        $('#requestList').append("<li id='" + reqID + "'>" + localStorage.getItem(reqID) + "</li>");
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

    $('#taskList').on("click", "li", function (event) {
      console.log("Submitting click");
        self = $(this);
        taskID = self.attr('id');
        localStorage.removeItem(taskID);
        self.slideUp('slow', function () {
            self.remove();
        });

    });

    $("button").click(function(){
      var id = $(this).attr('id');
      alert(id);
      var reqID = "req-" + i;
      var checkIn = $('#cIn').val();
      var checkOut = $('#cOut').val();
      var guests = $('#guests').val();
      var room = $('#room').val();

      if($('#cIn').val() !== "" && $('#cOut').val() !== "" && $('#guests').val() !== "") {
        var fullRequest = id + ": " + "Check-In Date: " + checkIn + ", Check-Out Date: " + checkOut;
        fullRequest = fullRequest + ", Guest: " + guests + ", Room Type: " + room;
        console.log("Requesting --> " + fullRequest);

        localStorage.setItem(reqID, fullRequest);
        $('#requestList').append("<li class='request' id='" + reqID + "'>" + fullRequest + "</li>");
        var req = $('#' + reqID);
        req.css('display', 'none');
        req.slideDown();
        $('#cIn').val("");
        $('#cOut').val("");
        $('#guests').val("");
        ++i;
      } else {
        alert("Cannot Book Request.  Please complete all form fields")
      }
    });

});
