$(document).on("ready", function() {
  $(".new-tweet").on("keyup", "textarea", function(event) {
    var counter = 140;
    var length = $(this).val().length;
    counter -= length;
    $(this).closest(".new-tweet").find(".counter")[0].innerText = Number(counter);
    if (length >= 140) {
      $(".counter").addClass("red-text");
    };
    if ($(".counter").hasClass("red-text") && length <= 140) {
      $(".counter").removeClass("red-text");
    };
  });
});