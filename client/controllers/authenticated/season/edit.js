Template.SeasonEdit.created = function() {
  this.editSeason = new ReactiveVar(false);
};

Template.SeasonEdit.rendered = function() {
  // just show month/day/year... no time
  $('.date-time-picker').datetimepicker(
    {
      format: 'MM/DD/YYYY'
    });
};

Template.SeasonEdit.helpers({
  rvEditSeason: function() {
    return Template.instance().editSeason.get();
  },
  cSeason: function() {
    if (Meteor.user()) {
      return Seasons.findOne({
        _id: Session.get('sSeasonId')
      });
    }
  }
});

Template.SeasonEdit.events({
  'click .edit-season': function(evt, template) {
    var editSeason = template.editSeason.get();
    template.editSeason.set(!editSeason);
  },
  'click .date-time-picker-season-start': function(evt, template) {
    $('.date-time-picker-season-start').datetimepicker(
      {
      format: 'MM/DD/YYYY'
      }
    );
  },
  'click .date-time-picker-season-end': function(evt, template) {
    $('.date-time-picker-season-end').datetimepicker(
      {
      format: 'MM/DD/YYYY'
      }
    );
  },
  'click .date-time-picker-playoff-start': function(evt, template) {
    $('.date-time-picker-playoff-start').datetimepicker(
      {
      format: 'MM/DD/YYYY'
      }
    );
  },
  'click .date-time-picker-playoff-end': function(evt, template) {
    $('.date-time-picker-playoff-end').datetimepicker(
      {
      format: 'MM/DD/YYYY'
      }
    );
  },
  'click .cancel-edit': function(evt, template) {
    var editSeason = template.editSeason.get();
    template.editSeason.set(!editSeason);
  },
  'submit form#edit-season-form': function(evt, template) {
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
      _id:              Session.get('sSeasonId'),
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

    Meteor.call('updateSeason', season, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      var editSeason = template.editSeason.get();
      template.editSeason.set(!editSeason);
    });

    // client side alert
    Bert.alert('Season Updated', 'success', 'growl-top-right');
  }
});
