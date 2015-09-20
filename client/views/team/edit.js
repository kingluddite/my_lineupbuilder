Template.tEditTeam.events({

  'submit form#editTeamForm': function(evt) {
    evt.preventDefault();

    var currentTeamId = Session.get('sTeamId');

    var teamProperties = {
      teamName: $(evt.target).find('[name=teamName]').val(),
      coachName: $(evt.target).find('[name=coachName]').val(),
      coachEmail: Number($(evt.target).find('[name=coachEmail]').val()),
      leagueName: $(evt.target).find('[name=leagueName]').val(),
      logoUrl: Number($(evt.target).find('[name=logoUrl]').val()),
      homeJerseyColor: $(evt.target).find('[name=homeJerseyColor]').val(),
      awayJerseyColor: Number($(evt.target).find('[name=awayJerseyColor]').val())
    };

    Teams.update(currentTeamId, {
      $set: teamProperties
    }, function(error) {
      if (error) {
        return throwError(error.reason);
      }
    });
  }
});
