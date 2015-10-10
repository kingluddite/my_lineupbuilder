Template.GameEdit.rendered = function() {
  // adding a date field renders the proper date in this field
  //  when page loads, without it, the wrong date populates
  $('.date-time-picker').datetimepicker('11/18/2015');

  // when template loads find the boolean value of homeTeam
  var currentGame = Games.findOne({
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

// values of unchecked boxes do not get posted
// to get a true or false value entered into db
// we create the myFormationChoice variable
// and populate it with true or false if checked or unchecked
// then call this function when updating game db
// and true is entered for myFormation if checked
// and false is entered for myFormation if not checked
function isHomeChecked() {
  var myFormationChoice;

  if ($('.home-team-chkbox').prop('checked')) {
    myFormationChoice = true;
  } else {
    myFormationChoice = false;
  }
  return myFormationChoice;
}

Template.GameEdit.events({
  // need this event here for when game appears on 'add game' click
  //  also need it in render when template loads
  'click .date-time-picker': function(evt, template) {
    $('.date-time-picker').datetimepicker();
  },

  'submit form#editGameForm': function(evt, template) {
    evt.preventDefault();

    var currentGameId = Session.get('sGameId');
    // convert the string date to an ISO String
    // which is required by moment
    var frmDateTime = $(evt.target).find('[name=gameDateTime]').val();
    var convertedDate = new Date(frmDateTime);

    var gameProperties = {
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
