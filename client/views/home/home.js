Template.Home.rendered = function() {
  $(".menu-toggle").click(function(e) {
    e.preventDefault();
    $(".container").toggleClass("toggled");
  });

};
