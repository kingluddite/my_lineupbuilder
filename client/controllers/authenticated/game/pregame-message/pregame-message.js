Template.PregameMessageEdit.helpers({
  cGame: function () {
    return Games.findOne({
      _id: Session.get('sGameId')
    });
  }
});

Template.PregameMessageEdit.events({

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
      Router.go('PregameMessageShow', {
        _id: Session.get('sGameId')
      });
    });


    // client side alert
    Bert.alert('Pregame Message Updated', 'success', 'growl-top-right');
  }
});

Template.PregameMessageShow.helpers({
  cGame: function () {
    return Games.findOne({
      _id: Session.get('sGameId')
    });
  }
});

Template.PregameMessageShow.events({
  'click .edit-message': function (evt, template) {
    Router.go('PregameMessageEdit', {
        _id: Session.get('sGameId')
    });
  }
});
