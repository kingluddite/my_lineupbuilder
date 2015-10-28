Template.PregameMessage.events({

  // when add team form is submitted
  //  grab the form data and pass it to the server
  'submit #pregame-message-form': function(evt, template) {
    var gameProperties;
    evt.preventDefault();

    gameProperties = {
      currentGameId:   Session.get('sGameId'),
      pregameMessage:  $(evt.target).find('[name=pregameMessage]').val(),

    };

    //errors = validateTeam(game);
    // if (errors.title || errors.url)

    // if (errors.name) {
    //   return Session.set('sTeamSubmitErrors', errors);
    // }

    Meteor.call('updatePregameMessage', gameProperties, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
    });

    // client side alert
    Bert.alert('Pregame Message Created', 'success', 'growl-top-right');
  }
});
