Template.SeasonNew.onCreated(function() {
  Session.set('sSeasonSubmitErrors', {});
});

Template.SeasonNew.helpers({
  // if there is a Season return false
  // so we can hide the add Season form
  checkIfSeasonExists: function() {
    if (Meteor.user()) {
      var Season = Seasons.find().count();
      if (Season > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  errorMessage: function(field) {
    return Session.get('sSeasonSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('sSeasonSubmitErrors')[field] ? 'has-error' : '';
  },
  sSeasonNew: function() {
    return Session.get('sSeasonNew');
  }
});

Template.SeasonNew.events({

  // when add Season form is submitted
  //  grab the form data and pass it to the server
  'submit form#newSeasonForm': function(evt) {
    evt.preventDefault();

    var season = {
      seasonName: $(evt.target).find('[name=seasonName]').val(),
      teamId: Session.get('sTeamId'),
      leagueId: Session.get('sLeagueId')
    };

    var errors = validateSeason(season);
    // if (errors.title || errors.url)

    if (errors.name)
      return Session.set('sSeasonSubmitErrors', errors);

    Meteor.call('newSeason', season, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }

      Session.setPersistent('sSeasonId', id);
      Session.set('sSeasonNew', true);
    });
  }
});
