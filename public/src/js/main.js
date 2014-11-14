(function() {
  $(function() {
    return $(".expand").on("click", function() {
      return $(".hide", $(this).parent()).toggleClass("hide");
    });
  });

}).call(this);
