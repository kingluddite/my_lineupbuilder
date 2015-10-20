Template.FormationNew.helpers({
  sGameId: function() {
    return Session.get('sGameId');
  },
  currentFormation: function() {
    var currGame = Games.findOne({
      _id: Session.get('sGameId')
    });
    console.log(currGame);
    currFormation = currGame.myFormation;
    if (currFormation) {
      return currFormation;
    } else {
      return '4-4-2';
    }
  }
});

Template.FormationNew.events({
  'click input': function(evt, template) {
    // $('.field').addClass()
    var myFormation = evt.target.value;
    // when user clicks on formation choice
    //  grab the value from that radio button choice
    //  remove all existing classes
    //  add the pre-existing .field class and add to it their
    //  radio button formation choice and append it to 'frm-'
    //  this will replace class="field frm-4-4-2"
    //  with something like class="field frm-4-3-3-flat"
    $('.field').removeClass().addClass('field frm-' + myFormation);
  },

  'submit form#new-formation-form': function(evt, template) {
    evt.preventDefault();

    // get all the radio button choices
    var allRadioChoices = document.forms[0].elements;
    var choiceFormation;
    // loop through them
    for (var i = 0; i < allRadioChoices.length; i++) {
      // grab the only button that is selected
      if (allRadioChoices[i].checked) {
        // return it's value so we can enter it into the db
        choiceFormation = allRadioChoices[i].value;
      }
    }

    var currentTeamId = Session.get('sTeamId');
    var currentGameId = Session.get('sGameId');

    var gameProperties = {
      teamId: currentTeamId,
      myFormation: choiceFormation
    };

    Games.update(currentGameId, {
      $set: gameProperties
    }, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      Session.setPersistent('sFormationChosen', true);
      Router.go('PositionNew', {
        _id: currentGameId
      });
    });
    Bert.alert('Formation Created', 'success', 'growl-top-right');
  }
});
