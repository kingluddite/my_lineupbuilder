Template.TeamAdd.helpers({
  // if there is a team return false
  // so we can hide the add team form
  checkIfTeamExists: function() {
    if (Meteor.user()) {
      var team = Teams.find().count();
      if (team > 0) {
        return true;
      } else {
        return false;
      }
    }
  }
});

Template.TeamAdd.events({

  // when add team form is submitted
  //  grab the form data and pass it to the server
  'submit form#addTeamForm': function(evt) {
    evt.preventDefault();

    var team = {
      teamName: $(evt.target).find('[name=teamName]').val(),
      coachName: $(evt.target).find('[name=coachName]').val(),
      coachEmail: $(evt.target).find('[name=coachEmail]').val(),
      leagueName: $(evt.target).find('[name=leagueName]').val(),
      logoUrl: $(evt.target).find('[name=logoUrl]').val(),
      homeJerseyColor: $(evt.target).find('[name=homeJerseyColor]').val(),
      awayJerseyColor: $(evt.target).find('[name=awayJerseyColor]').val()
    };

    Meteor.call('addTeam', team, function(error, id) {
      if (error) {
        return alert(error.reason);
      }

      Session.setPersistent('sTeamId', id);
      $('.team-created').html('<i class="fa fa-check"></i> <span> Team Created</span>');
      $('.team-created span').css('text-decoration', 'line-through');
      $('.team-created').addClass('text-muted');
    });
  }
});
