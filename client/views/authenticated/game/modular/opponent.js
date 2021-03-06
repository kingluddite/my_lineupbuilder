Template.Opponent.created = function() {
  this.editOpponent = new ReactiveVar(false);
};

Template.Opponent.rendered = function() {
  var currentGame;
  // when template loads find the boolean value of homeTeam
  currentGame = Games.findOne({
    _id: Session.get('sGameId')
  });

  // if true
  if (currentGame.homeTeam) {
    // check the box
    $('.home-team-chkbox').prop('checked', true);
  } else {
    console.log('yo2');
  }
};

Template.Opponent.helpers({
  rvEditOpponent: function () {
    return Template.instance().editOpponent.get();
  },
  // if there is a team return false
  // so we can hide the add team form
  cGame: function() {
    if (Meteor.user()) {

      return Games.findOne({
        _id: Session.get('sGameId')
      });
    }
  }
});

Template.Opponent.events({
  'click .edit-opponent': function(evt, template) {
    var editOpponent, 
        currentGame;

    editOpponent = template.editOpponent.get();
    template.editOpponent.set(!editOpponent);
    
    // when template loads find the boolean value of homeTeam
    currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });
  },
  'click .cancel-edit': function(evt, template) {
    var editOpponent;
    editOpponent = template.editOpponent.get();
    template.editOpponent.set(!editOpponent);
  },
  'submit form#edit-game-form': function(evt, template) {
    var currentGameId, 
        gameProperties,
        editOpponent;

    evt.preventDefault();

    currentGameId = Session.get('sGameId');

    gameProperties = {
      opponentName: $(evt.target).find('[name=opponentName]').val(),
      homeTeam: isHomeChecked()
    };

    Games.update(currentGameId, {
      $set: gameProperties
    }, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
    });

    // reactive var to set opponent after update
    editOpponent = template.editOpponent.get();
    template.editOpponent.set(!editOpponent);
  }
});
