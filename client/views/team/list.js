// when the trashcan icon is clicked, the player is deleted
var removeTeam = function() {
  Teams.remove({
    _id: Session.get('sTeamId')
  });
};


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
  }
});

Template.TeamList.events({
  // when click on remove team is removed after
  // confirmation
  'click .remove': function(evt, tmpl) {
    evt.preventDefault();

    if (confirm("Delete this team?")) {
      Session.set('sTeamId', this._id);
      removePlayer();
      Session.set('sTeamId', null);
    }
  }
});
