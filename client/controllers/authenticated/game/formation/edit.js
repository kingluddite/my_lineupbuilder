Template.FormationEdit.rendered = function() {
  // as soon as the template loads prefill the radio button
  if (Meteor.user()) {
    var getFormation,
        currFormation,
        allRadioChoices;

    // we need to search the game and get a document
    getFormation = Games.findOne({
      _id: Session.get('sGameId')
    });
    // find the formation for the current game
    currFormation = getFormation.myFormation;
    // grab all the radio buttons
    allRadioChoices = $('form input:radio');
    for (var i = 0; i < allRadioChoices.length; i++) {
      // as you loop through all the radio buttons
      // find a radio button that's value matches what is in
      // our games collection
      if (allRadioChoices[i].value === currFormation) {
        // when you find a match set that radio button to true
        // so it will be selected when the template loads
        allRadioChoices[i].checked = true;
      }
    }
  }
};

Template.FormationEdit.helpers({
  sGameId: function() {
    return Session.get('sGameId');
  }
});

Template.FormationEdit.events({
  'click input': function(evt, template) {
    var myFormation;
    
    myFormation = evt.target.value;
    // when user clicks on formation choice
    //  grab the value from that radio button choice
    //  remove all existing classes
    //  add the pre-existing .field class and add to it their
    //  radio button formation choice and append it to 'frm-'
    //  this will replace class="field frm-4-4-2"
    //  with something like class="field frm-4-3-3-flat"
    $('.field').removeClass().addClass('field frm-' + myFormation);
  },

  'submit form#edit-formation-form': function(evt, template) {
    var allRadioChoices,
        choiceFormation,
        currentGameId,
        currentTeamId,
        gameProperties;

    evt.preventDefault();

    // get all the radio button choices
    allRadioChoices = document.forms[0].elements;
    choiceFormation;
    // loop through them
    for (var i = 0; i < allRadioChoices.length; i++) {
      // grab the only button that is selected
      if (allRadioChoices[i].checked) {
        // return it's value so we can enter it into the db
        choiceFormation = allRadioChoices[i].value;
      }
    }

    currentTeamId = Session.get('sTeamId');
    currentGameId = Session.get('sGameId');

    gameProperties = {
      teamId: currentTeamId,
      myFormation: choiceFormation
    };

    Games.update(currentGameId, {
      $set: gameProperties
    }, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      Router.go('GameShow', {
        _id: currentGameId
      });
    });
  }
});
