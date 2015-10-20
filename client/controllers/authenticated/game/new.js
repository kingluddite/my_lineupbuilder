function isHomeChecked() {
  var myFormationChoice;

  if ($('.home-team-chkbox').prop('checked')) {
    myFormationChoice = true;
  } else {
    myFormationChoice = false;
  }
  return myFormationChoice;
}

Template.GameNew.rendered = function() {
  // $('#gameDatePicker').datepicker();
  $('.date-time-picker').datetimepicker();
};

Template.GameNew.helpers({
  checkIfGameExists: function() {
    if (Meteor.user()) {
      var game = Games.find().count();
      if (game > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  sGameNew: function() {
    return Session.get('sGameNew');
  },
  sLeagueId: function() {
    return Session.get('sLeagueId');
  },
  cMyLeagues: function() {
    return Leagues.find();
  },
  sSeasonId: function() {
    return Session.get('sSeasonId');
  },
  sAddGame: function() {
    return Session.get('sAddGame');
  },
  cMySeasons: function() {
    return Seasons.find({
      leagueId: Session.get('sLeagueId')
    });
  }
});

Template.GameNew.events({
  // close new team panel is 'x' clicked
  'click .close-panel': function(evt, tmpl) {
    Session.setPersistent('sAddGame', false);
  },
  // need this event here for when game appears on 'add game' click
  //  also need it in render when template loads
  'click .date-time-picker': function(evt) {
    $('.date-time-picker').datetimepicker();
  },
  'submit form#new-game-form': function(evt) {
    evt.preventDefault();

    var currentTeamId = Session.get('sTeamId');
    // convert the string date to an ISO String
    // which is required by moment
    var frmDateTime = $(evt.target).find('[name=gameDateTime]').val();
    var convertedDate = new Date(frmDateTime);

    var game = {
      teamId: currentTeamId,
      gameDateTime: convertedDate,
      // gameTime: $(evt.target).find('[name=gameTime]').val(),
      // we grab the ids for both leagueName and seasonName
      leagueName: $(evt.target).find('[name=leagueName]').val(),
      seasonName: $(evt.target).find('[name=seasonName]').val(),
      opponentName: $(evt.target).find('[name=opponentName]').val(),
      fieldName: $(evt.target).find('[name=fieldName]').val(),
      fieldUrl: $(evt.target).find('[name=fieldUrl]').val(),
      homeTeam: isHomeChecked()
    };

    Meteor.call('newGame', game, function(error, id) {
      if (error) {
        throwError(error.reason);
      }
      Session.setPersistent('sGameId', id);
      Session.setPersistent('sGameNew', true);
      Session.setPersistent('sAddGame', false);

    });
  }
});
