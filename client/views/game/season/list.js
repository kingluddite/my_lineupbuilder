// when the trashcan icon is clicked, the player is deleted
var removeSeason = function() {
  Seasons.remove({
    _id: Session.get('sSeasonId')
  });
};

// initially hide the instructions
Template.SeasonList.rendered = function() {
  $('.instructions').hide();
}

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
  'click .remove': function(evt, tmpl) {
    evt.preventDefault();

    if (confirm("Delete this season?")) {
      Session.set('sSeasonId', this._id);
      removeSeason();
      Session.set('sSeasonId', null);
    }
  },
  // when person clicks to enter their season
  // set that season id as the current session
  'click .season-list a': function(evt, tmpl) {
    Session.setPersistent('sSeasonId', this._id);
  },
  // add a new season button
  'click .new-season': function(evt, tmpl) {
    // if coach needs to add a season we set this session to true
    // so he can see that form
    Session.setPersistent('sAddSeason', true);
  },
  // toggle help text for season list
  'click .help-text': function(evt, tmpl) {
    $('.instructions').toggle(400);
    return false;
  },

});
