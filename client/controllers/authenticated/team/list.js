Template.TeamList.helpers({
  // grab all the teams and provide collection for roster template
  cTeams: function() {
    // only if the user is logged in
    if (Meteor.user()) {
      // grab all the teams the user created (so we know it's their
      //   team)
      return Teams.find();
    }
  },

  // this template needs access to the following sessions
  sTeamId: function() {
    return Session.get('sTeamId');
  },

  sTeamNew: function() {
    return Session.get('sTeamNew');
  },

  sAddTeam: function() {
    return Session.get('sAddTeam');
  }
});

Template.TeamList.events({
  // when click on remove team is removed after
  // confirmation
  'click .remove': function(evt, template) {
    var currentTeam;

    evt.preventDefault();

    // to deal with losing scope inside bootbox
    currentTeam = this._id;
    
    bootbox.confirm("Are you sure?", function(result) {
      Meteor.call('removeTeam', currentTeam, function(error, id) {
        if (error) {
          return throwError(error.reason);
        }
      });

      // client side alert
      Bert.alert('Team Deleted', 'danger', 'growl-top-right');
      // remove team id session when team removed from collection
      Session.set('sTeamId', null);
    });
  },
  
  // when person clicks to enter their team
  // set that team id as the current session
  'click .team-list a': function(evt, template) {
    Session.setPersistent('sTeamId', this._id);
  },

  // add a new team button
  'click .new-team': function(evt, template) {
    // if coach needs to add a team we set this session to true
    // so he can see that form
    // show form when add team button is clicked
    Session.setPersistent('sAddTeam', true);
  }

});
