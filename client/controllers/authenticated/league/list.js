Template.LeagueList.helpers({
  // grab all the leagues and provide collection for roster template
  cLeagues: function() {
    // grab all the leagues the user created (so we know it's their
    //   league)
    return Leagues.find();
  },

  sGameId: function() {
    return Session.get('sGameId');
  },

  sLeagueId: function() {
    return Session.get('sLeagueId');
  },

  sAddLeague: function() {
    return Session.get('sAddLeague');
  },

  sLeagueNew: function() {
    return Session.get('sLeagueNew');
  }
});

// TODO make remove league server side only
Template.LeagueList.events({
  // when click on remove league is removed after
  // confirmation
  'click .remove': function(evt, template) {
    var currentLeague;
    evt.preventDefault();
     
    // we need to store the id of the league using this here
    //  so that when we lose scope inside bootbox, we can keep track
    //  of the current league we want to delete 
    currentLeague = this._id;
    //if (confirm("Delete this league?")) {
     bootbox.confirm("Are you sure?", function(result) {
      
      Meteor.call('removeLeague', currentLeague, function(error, id) {
        if (error) {
          return throwError(error.reason);
        }
      });
      Session.set('sLeagueId', null);
     });
    //}
  },
  // when person clicks to enter their league
  // set that league id as the current session
  'click .league-list a': function(evt, template) {
    Session.setPersistent('sLeagueId', this._id);
  },
  // add a new league button
  'click .new-league': function(evt, template) {
    // if coach needs to add a league we set this session to true
    // so he can see that form
    Session.setPersistent('sAddLeague', true);
  }
});
