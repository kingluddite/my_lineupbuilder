Template.TeamEdit.rendered = function () {
  $('.league-selection').selectpicker();
  $('.season-selection').selectpicker();
};

Template.TeamEdit.helpers({
  // if there is a team return false
  // so we can hide the add team form
  cTeam: function() {
    if (Meteor.user()) {
      return Teams.findOne({
        _id: Session.get('sTeamId')
      });
    }
  },
  // grab all the leagues
  cLeagues: function() {
    return Leagues.find();
  },

  // grab all the seasons
  cSeasons: function() {
    return Seasons.find();
  }
});

Template.TeamEdit.events({

  'submit form#edit-team-form': function(evt, template) {
    var teamProperties;

    evt.preventDefault();

    teamProperties = {
      _id:   Session.get('sTeamId'),
      teamName:        $(evt.target).find('[name=teamName]').val(),
      coachName:       $(evt.target).find('[name=coachName]').val(),
      coachEmail:      $(evt.target).find('[name=coachEmail]').val(),
      logoUrl:         $(evt.target).find('[name=logoUrl]').val(),
      homeJerseyColor: $(evt.target).find('[name=homeJerseyColor]').val(),
      awayJerseyColor: $(evt.target).find('[name=awayJerseyColor]').val(),
      leagueId:        $(evt.target).find('[name=leagueName]').val(),
      seasonId:        $(evt.target).find('[name=seasonName]').val()
    };

    Meteor.call('updateTeam', teamProperties, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      Bert.alert('Team Updated', 'success', 'growl-top-right');
      Router.go('TeamShow', {
        _id: teamProperties._id
      });
    });
  }
});
