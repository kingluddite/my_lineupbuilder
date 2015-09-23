Template.FormationAdd.rendered = function() {
  $('.draggable').draggable();
  $('.droppable').droppable({
    // drop: function(event, ui) {
    //   $(this)
    //     .addClass('ui-state-highlight')
    //     .find('p')
    //     .html('dropped');
    //   console.log(ui);
    // }

  });
};

Template.FormationAdd.helpers({
  gameId: function() {
    return Session.get('sGameId');
  }
});


Template.FormationAdd.events({

  'click input': function(evt) {
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

  'submit form#addFormation': function(evt) {
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

    var currentGameId = Session.get('sGameId');

    var gameProperties = {
      myFormation: choiceFormation
    };

    Games.update(currentGameId, {
      $set: gameProperties
    }, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      Router.go('game.show', {
        _id: currentGameId
      });
    });
  }
});
