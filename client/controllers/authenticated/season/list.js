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
    var currentSeason;

    evt.preventDefault();

    currentSeason = this._id;
    bootbox.confirm("Are you sure?", function(result) {
      Meteor.call('removeSeason', currentSeason, function(error, id) {
        if (error) {
          return throwError(error.reason);
        }
      Session.set('sSeasonId', null);
      // client side alert
      Bert.alert('Season Deleted', 'danger', 'growl-top-right');
      });
      
    });

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
