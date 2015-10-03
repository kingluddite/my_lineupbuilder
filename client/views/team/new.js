Template.TeamNew.onCreated(function() {
  Session.set('sTeamSubmitErrors', {});
});

Template.TeamNew.helpers({
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
  },
  errorMessage: function(field) {
    return Session.get('sTeamSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('sTeamSubmitErrors')[field] ? 'has-error' : '';
  },
  sTeamNew: function() {
    return Session.get('sTeamNew');
  },
  // show add team form when click add team button
  sAddTeam: function() {
    return Session.get('sAddTeam');
  }
});

Template.TeamNew.events({
  'click .close-panel': function(evt, tmpl) {
    Session.setPersistent('sAddTeam', false);
  },
  // when add team form is submitted
  //  grab the form data and pass it to the server
  'submit form#newTeamForm': function(evt) {
    evt.preventDefault();

    var team = {
      teamName: $(evt.target).find('[name=teamName]').val(),
      coachName: $(evt.target).find('[name=coachName]').val(),
      coachEmail: $(evt.target).find('[name=coachEmail]').val(),
      logoUrl: $(evt.target).find('[name=logoUrl]').val(),
      homeJerseyColor: $(evt.target).find('[name=homeJerseyColor]').val(),
      awayJerseyColor: $(evt.target).find('[name=awayJerseyColor]').val()
    };

    var errors = validateTeam(team);
    // if (errors.title || errors.url)

    if (errors.name)
      return Session.set('sTeamSubmitErrors', errors);

    Meteor.call('newTeam', team, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }

      Session.setPersistent('sTeamId', id);
      // set sTeamNew to true after form submit so list of teams can be seen
      Session.set('sTeamNew', true);
      // hide add team form after submitting form
      Session.set('sAddTeam', false);
      // $('.team-created').html('<i class="fa fa-check"></i> <span> Team Created</span>');
      // $('.team-created span').css('text-decoration', 'line-through');
      // $('.team-created').addClass('text-muted');
    });
  }
});
