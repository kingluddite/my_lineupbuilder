Template.TeamEdit.helpers({
  // if there is a team return false
  // so we can hide the add team form
  cTeam: function() {
    if (Meteor.user()) {
      return Teams.findOne({
        _id: Session.get('sTeamId')
      });
    }
  }
});

Template.TeamEdit.events({

  'submit form#editTeamForm': function(evt) {
    evt.preventDefault();

    var currentTeamId = Session.get('sTeamId');

    var teamProperties = {
      teamName: $(evt.target).find('[name=teamName]').val(),
      coachName: $(evt.target).find('[name=coachName]').val(),
      coachEmail: $(evt.target).find('[name=coachEmail]').val(),
      logoUrl: $(evt.target).find('[name=logoUrl]').val(),
      homeJerseyColor: $(evt.target).find('[name=homeJerseyColor]').val(),
      awayJerseyColor: $(evt.target).find('[name=awayJerseyColor]').val()
    };

    Teams.update(currentTeamId, {
      $set: teamProperties
    }, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      Router.go('TeamShow', {
        _id: currentTeamId
      });
    });
  }
});
