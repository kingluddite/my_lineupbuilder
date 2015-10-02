// when the trashcan icon is clicked, the player is deleted
var removeLeague = function() {
  Leagues.remove({
    _id: Session.get('sLeagueId')
  });
};

// initially hide the instructions
Template.LeagueList.rendered = function() {
  $('.instructions').hide();
}

Template.LeagueList.helpers({
  // grab all the leagues and provide collection for roster template
  cLeagues: function() {
    // grab all the leagues the user created (so we know it's their
    //   league)
    return Leagues.find();
  },

  sLeagueId: function() {
    return Session.get('sLeagueId');
  }
});

Template.LeagueList.events({
  // when click on remove league is removed after
  // confirmation
  'click .remove': function(evt, tmpl) {
    evt.preventDefault();

    if (confirm("Delete this league?")) {
      Session.set('sLeagueId', this._id);
      removeLeague();
      Session.set('sLeagueId', null);
    }
  },
  // toggle help text for league list
  'click .help-text': function(evt, tmpl) {
    $('.instructions').toggle(400);
    return false;
  },
  // when person clicks to enter their league
  // set that league id as the current session
  'click .league-list a': function(evt, tmpl) {
    Session.setPersistent('sLeagueId', this._id);
  },
  // add a new league button
  'click .new-league': function(evt, tmpl) {
    // if coach needs to add a league we set this session to true
    // so he can see that form
    Session.setPersistent('sLeagueNew', true);
  }

});
