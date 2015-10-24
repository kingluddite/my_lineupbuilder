Template.GameEdit.rendered = function() {
  var currentGame;
  // adding a date field renders the proper date in this field
  //  when page loads, without it, the wrong date populates
  $('.date-time-picker').datetimepicker('11/18/2015');

  // when template loads find the boolean value of homeTeam
  currentGame = Games.findOne({
    _id: Session.get('sGameId')
  });
  // if true
  if (currentGame.homeTeam) {
    // check the box
    $('.home-team-chkbox').prop('checked', true);
  }

};

Template.GameEdit.helpers({
  // if there is a team return false
  // so we can hide the add team form
  cGame: function() {
    if (Meteor.user()) {
      return Games.findOne({
        _id: Session.get('sGameId')
      });
    }
  },
  sGameId: function() {
    return Session.get('sGameId')
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
  sFormationChosen: function() {
    return Session.get('sFormationChosen');
  },
  cMySeasons: function() {
    return Seasons.find({
      leagueId: Session.get('sLeagueId')
    });
  }
});

Template.GameEdit.events({
  // need this event here for when game appears on 'add game' click
  //  also need it in render when template loads
  'click .date-time-picker': function(evt, template) {
    $('.date-time-picker').datetimepicker();
  },

  'submit form#edit-game-form': function(evt, template) {
    var currentGameId,
        frmDateTime,
        convertedDate,
        gameProperties;

    evt.preventDefault();

    currentGameId = Session.get('sGameId');
    // convert the string date to an ISO String
    // which is required by moment
    frmDateTime = $(evt.target).find('[name=gameDateTime]').val();
    convertedDate = new Date(frmDateTime);

    gameProperties = {
      gameDateTime: convertedDate,
      leagueName: $(evt.target).find('[name=leagueName]').val(),
      seasonName: $(evt.target).find('[name=seasonName]').val(),
      opponentName: $(evt.target).find('[name=opponentName]').val(),
      fieldName: $(evt.target).find('[name=fieldName]').val(),
      fieldUrl: $(evt.target).find('[name=fieldUrl]').val(),
      myFormation: $('select.formation-choice-select option:selected').val(),
      homeTeam: isHomeChecked()
    };

    Games.update(currentGameId, {
      $set: gameProperties
    }, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      Router.go('GameEdit', {
        _id: currentGameId
      });
    });
  }
});
