// when the trashcan icon is clicked, the player is deleted
var removeTeam = function() {
  Teams.remove({
    _id: Session.get('sTeamId')
  });
};

// initially hide the instructions
Template.TeamList.rendered = function() {
  $('.instructions').hide();
}

Template.TeamList.helpers({
  // grab all the teams and provide collection for roster template
  cTeams: function() {
    // only if the user is logged in
    if (Meteor.user()) {
      // grab all the teams the user created (so we know it's their
      //   team)
      return Teams.find();
    } else {
      this.ready();
    }
  },
  // this template needs access to the following sessions
  sTeamId: function() {
    return Session.get('sTeamId');
  },
  sTeamNew: function() {
    return Session.get('sTeamNew');
  }
});

Template.TeamList.events({
  // when click on remove team is removed after
  // confirmation
  'click .remove': function(evt, tmpl) {
    evt.preventDefault();

    if (confirm("Delete this team?")) {
      Session.set('sTeamId', this._id);
      removeTeam();
      // remove team id session when team removed from collection
      Session.set('sTeamId', null);
    }
  },
  // toggle help text for team list
  'click .help-text': function(evt, tmpl) {
    $('.instructions').toggle(400);
    return false;
  },
  // when person clicks to enter their team
  // set that team id as the current session
  'click .team-list a': function(evt, tmpl) {
    Session.setPersistent('sTeamId', this._id);
  },
  // add a new team button
  'click .new-team': function(evt, tmpl) {
    // if coach needs to add a team we set this session to true
    // so he can see that form
    // show form when add team button is clicked
    Session.setPersistent('sAddTeam', true);
  }

});
