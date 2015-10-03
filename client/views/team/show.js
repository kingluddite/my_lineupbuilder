// initially hide the instructions
Template.TeamShow.rendered = function() {
  $('.instructions').hide();
}

Template.TeamShow.helpers({
  // if there is a team return false
  // so we can hide the add team form
  cTeam: function() {
    if (Meteor.user()) {
      return Teams.findOne({
        _id: Session.get('sTeamId')
      });
    }

  },
  sTeamId: function() {
    return Session.get('sTeamId');
  },
  sGameId: function() {
    return Session.get('sGameId');
  }

});

Template.TeamShow.events({
  // toggle the info at top of page
  'click .help-text': function(evt, tmpl) {
    $('.instructions').toggle(400);
    return false;
  }
});
