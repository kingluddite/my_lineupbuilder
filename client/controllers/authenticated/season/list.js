// TODO MAKE THIS SERVER SIDE REMOVE Method
var removeSeason = function() {
  Seasons.remove({
    _id: Session.get('sSeasonId')
  });
};

Template.SeasonList.helpers({
  // grab all the leagues and provide collection for roster template
  cSeasons: function() {
    // grab all the leagues the user created (so we know it's their
    //   season)
    return Seasons.find();
  },

  sSeasonId: function() {
    return Session.get('sSeasonId');
  },

  sAddSeason: function() {
    return Session.get('sAddSeason');
  },

  sSeasonNew: function() {
    return Session.get('sSeasonNew');
  },

  sGameId: function() {
    return Session.get('sGameId');
  }
});

Template.SeasonList.events({
  // when click on remove season is removed after
  // confirmation
  'click .remove': function(evt, template) {
    evt.preventDefault();

    if (confirm('Delete this season?')) {
      Session.set('sSeasonId', this._id);
      // TODO MAKE THIS REMOVE SERVER SIDE METHOD
      removeSeason();
      Session.set('sSeasonId', null);
    }
  },
  // when person clicks to enter their season
  // set that season id as the current session
  'click .season-list a': function(evt, template) {
    Session.setPersistent('sSeasonId', this._id);
  },
  // add a new season button
  'click .new-season': function(evt, template) {
    // if coach needs to add a season we set this session to true
    // so he can see that form
    Session.setPersistent('sAddSeason', true);
  }

});
