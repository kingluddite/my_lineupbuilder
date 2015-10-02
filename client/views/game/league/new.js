Template.LeagueNew.onCreated(function() {
  Session.set('sLeagueSubmitErrors', {});
});

Template.LeagueNew.helpers({
  // if there is a league return false
  // so we can hide the add league form
  checkIfLeagueExists: function() {
    if (Meteor.user()) {
      var league = Leagues.find().count();
      if (league > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  errorMessage: function(field) {
    return Session.get('sLeagueSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('sLeagueSubmitErrors')[field] ? 'has-error' : '';
  },
  sLeagueNew: function() {
    return Session.get('sLeagueNew');
  }
});

Template.LeagueNew.events({

  // when add league form is submitted
  //  grab the form data and pass it to the server
  'submit form#newLeagueForm': function(evt) {
    evt.preventDefault();

    var league = {
      leagueName: $(evt.target).find('[name=leagueName]').val(),
      teamId: Session.get('sTeamId')
    };

    var errors = validateLeague(league);
    // if (errors.title || errors.url)

    if (errors.name)
      return Session.set('sLeagueSubmitErrors', errors);

    Meteor.call('newLeague', league, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }

      Session.setPersistent('sLeagueId', id);
      Session.set('sLeagueNew', false);
    });
  }
});
