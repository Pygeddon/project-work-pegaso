$("#book-button").on("click", function (event) {
  event.preventDefault();

  var formData = {
    name: $("#name").val(),
    email: $("#email").val(),
    event: $("#event").val(),
    date: $("#date").val(),
  };

  $.ajax({
    url: "http://localhost:4000",
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
