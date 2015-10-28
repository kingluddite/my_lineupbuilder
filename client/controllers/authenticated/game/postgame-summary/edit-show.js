Template.PostgameSummaryEdit.helpers({
  cGame: function () {
    return Games.findOne({
      _id: Session.get('sGameId')
    });
  }
});

Template.PostgameSummaryEdit.events({

  // when add team form is submitted
  //  grab the form data and pass it to the server
  'submit #postgame-summary-form': function(evt, template) {
    var gameProperties;
    
    evt.preventDefault();

    gameProperties = {
      currentGameId:   Session.get('sGameId'),
      postgameSummary:  $(evt.target).find('[name=postgameSummary]').val()
    };

    Meteor.call('updatePostgameSummary', gameProperties, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      Router.go('PostgameSummaryShow', {
        _id: Session.get('sGameId')
      });
    });

    // client side alert
    Bert.alert('Postgame Summary Updated', 'success', 'growl-top-right');
  }
});

Template.PostgameSummaryShow.helpers({
  cGame: function () {
    return Games.findOne({
      _id: Session.get('sGameId')
    });
  }
});

Template.PostgameSummaryShow.events({
  'click .edit-message': function (evt, template) {
    Router.go('PostgameSummary', {
        _id: Session.get('sGameId')
    });
  }
});
