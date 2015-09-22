Template.FormationList.rendered = function() {
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

Template.FormationList.events({

  'click input': function(evt) {
    // $('.field').addClass()
    var myFormation = evt.target.value;
    $('.field').removeClass().addClass('field frm-' + myFormation);
  },

  'submit form#updateFormation': function(evt) {
    evt.preventDefault();

    var currentGameId = Session.get('sGameId');

    var gameProperties = {
      myFormation: $(evt.target).find('[name=myFormation]').val(),
      gameTime: $(evt.target).find('[name=gameTime]').val(),
      opponentName: $(evt.target).find('[name=opponentName]').val(),
      fieldName: $(evt.target).find('[name=fieldName]').val(),
      fieldUrl: $(evt.target).find('[name=fieldUrl]').val(),
      homeTeam: $(evt.target).find('[name=homeTeam]').val()
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
