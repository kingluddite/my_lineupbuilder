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

  'submit form#edit-league-form': function(evt, template) {
    var currentLeagueId,
        leagueProperties;

    evt.preventDefault();

    currentLeagueId = Session.get('sLeagueId');

    leagueProperties = {
      leagueName: $(evt.target)
        .find('[name=teamName]')
        .val()
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

