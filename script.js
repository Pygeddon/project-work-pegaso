$("#book-button").on("click", function (event) {
  event.preventDefault();

  var formData = {
    name: $("#name").val(),
    email: $("#email").val(),
    event: $("#event").val(),
    date: $("#date").val(),
  };

  $.ajax({
    url: "http://localhost:4000/tickets",
    type: "GET",
    data: formData,
    success: function (response) {
      console.log("Form submitted successfully:", response);
      alert("Form submitted successfully!");
    },
    error: function (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form!");
    },
  });
});
$(document).ready(function () {
  $.ajax({
    url: "http://localhost:4000/events",
    type: "GET",
    success: function (response) {
      console.log("Events data loaded successfully:", response);
      // You can process the response and update the page as needed
      var events = response;
      for (let event of events) {
        //$("#event").append(`<option value="${event.id}">${event.name}</option>`);
        console.log(event.date);
        $("#event-list").append(
          `<div class="row"><div class="col-md-4">
            <div class="card">
              <img src="assets/` +
            event.image +
            `" class="card-img-top" alt="Event 1">
              <div class="card-body">
                <h5 class="card-title">` +
            event.name +
            `</h5>
                <p class="card-text">` +
            event.description +
            `</p>
                <label for="date1">Date disponibili:</label>
                <select id="date1" class="form-control" defa>
                  <option selected="selected">` +
            event.date +
            `</option>
                  <option>2025-01-02</option>
                  <option>2025-01-03</option>
                  <option>2025-01-04</option>
                  <option>2025-01-05</option>
                </select>
                <button class="btn btn-primary mt-3">Buy Ticket</button>
              </div>
            </div>
          </div>
          </div>`
        );
      }
    },
    error: function (error) {
      console.error("Error loading events data:", error);
    },
  });
});
