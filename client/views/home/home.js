Template.Home.rendered = function() {
  $(".menu-toggle").click(function(e) {
    e.preventDefault();
    $(".container").toggleClass("toggled");
  });

};

Template.Home.helpers({
  sTeamId: function() {
    return Session.get('sTeamId');
  }
});
