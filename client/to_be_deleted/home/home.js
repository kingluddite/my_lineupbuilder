Template.Home.rendered = function() {
  $(".menu-toggle").click(function(evt) {
    evt.preventDefault();
    $(".container").toggleClass("toggled");
  });

};

Template.Home.helpers({
  sTeamId: function() {
    return Session.get('sTeamId');
  }
});
