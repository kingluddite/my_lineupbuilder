Template.LeagueEdit.helpers({


  cLeague: function() {
    if (Meteor.user()) {
      return Leagues.findOne({
        _id: Session.get('sLeagueId')
      });
    }
  }
});

Template.LeagueEdit.events({

  'submit form#editLeagueForm': function(evt) {
    evt.preventDefault();

    var currentLeagueId = Session.get('sLeagueId');

    var leagueProperties = {
      leagueName: $(evt.target).find('[name=teamName]').val()
    };

    Leagues.update(currentLeagueId, {
      $set: leagueProperties
    }, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      Router.go('LeagueShow', {
        _id: currentLeagueId
      });
    });
  }
});
