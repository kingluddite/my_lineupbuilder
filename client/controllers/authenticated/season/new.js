Template.SeasonNew.onCreated(function() {
  Session.set('sSeasonSubmitErrors', {});
});

Template.SeasonNew.rendered = function() {
  // just show month/day/year... no time
  $('.date-time-picker').datetimepicker(
    {
      format: 'MM/DD/YYYY'
    });
};

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
  },

  sAddSeason: function() {
    return Session.get('sAddSeason');
  }
});

Template.SeasonNew.events({
  'click .close-panel': function(evt, template) {
    Session.setPersistent('sAddSeason', false);
  },
  // when add Season form is submitted
  //  grab the form data and pass it to the server
  'submit form#new-season-form': function(evt, template) {
    var season,
        frmSeasonStartDate,
        frmSeasonEndDate,
        frmPlayoffStartDate,
        frmPlayoffEndDate,
        convertedSeasonStartDate,
        convertedSeasonEndDate,
        convertedPlayoffStartDate,
        convertedPlayoffEndDate,
        errors;

    evt.preventDefault();
    
    frmSeasonStartDate        = $(evt.target).find('[name=seasonStartDate]').val();
    convertedSeasonStartDate  = new Date(frmSeasonStartDate);
    frmSeasonEndDate          = $(evt.target).find('[name=seasonEndDate]').val();
    convertedSeasonEndDate    = new Date(frmSeasonEndDate);
    frmPlayoffStartDate       = $(evt.target).find('[name=playoffStartDate]').val();
    convertedPlayoffStartDate = new Date(frmPlayoffStartDate);
    frmPlayoffEndDate         = $(evt.target).find('[name=playoffEndDate]').val();
    convertedPlayoffEndDate   = new Date(frmPlayoffEndDate);

    season = {
      seasonName:       $(evt.target).find('[name=seasonName]').val(),
      teamId:           Session.get('sTeamId'),
      leagueId:         Session.get('sLeagueId'),
      seasonStartDate:  convertedSeasonStartDate,
      seasonEndDate:    convertedSeasonEndDate,
      playoffStartDate: convertedPlayoffStartDate,
      playoffEndDate:   convertedPlayoffEndDate,
      seasonFee:        Number($(evt.target).find('[name=seasonFee]').val()),
    };

    errors = validateSeason(season);
    // if (errors.title || errors.url)

    if (errors.name) {
      return Session.set('sSeasonSubmitErrors', errors);
    }

    Meteor.call('newSeason', season, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }

      Session.setPersistent('sSeasonId', id);
      Session.setPersistent('sSeasonNew', true);
      Session.setPersistent('sAddSeason', false);
    });

    // client side alert
    Bert.alert('Season Created', 'success', 'growl-top-right');
  }
});
