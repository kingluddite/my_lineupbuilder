var renderTimeout = false;

Template.TeamNew.onCreated(function() {
  Session.set('sTeamSubmitErrors', {});
});

Template.TeamNew.rendered = function () {
  if (renderTimeout !== false) {
    Meteor.clearTimeout(renderTimeout);
  }
  renderTimeout = Meteor.setTimeout(function() {
    $('.league-selection').selectpicker("refresh");
    $('.season-selection').selectpicker("refresh");
  }, 10);
  $('.league-selection').selectpicker();
  $('.season-selection').selectpicker();

  
};

Template.TeamNew.helpers({
  // if there is a team return false
  // so we can hide the add team form
  checkIfTeamExists: function() {
    if (Meteor.user()) {
      var team;

      team = Teams.find().count();
      if (team > 0) {
        return true;
      } else {
        return false;
      }
    }
  },

  // grab all the leagues
  cLeagues: function() {
    return Leagues.find();
  },

  // grab all the seasons
  cSeasons: function() {
    return Seasons.find();
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

  'click .close-panel': function(evt, template) {
    Session.setPersistent('sAddTeam', false);
  },

  // when add team form is submitted
  //  grab the form data and pass it to the server
  'submit form#new-team-form': function(evt, template) {
    var team,
        errors;

    evt.preventDefault();

    team = {
      teamName:        $(evt.target).find('[name=teamName]').val(),
      coachName:       $(evt.target).find('[name=coachName]').val(),
      coachEmail:      $(evt.target).find('[name=coachEmail]').val(),
      logoUrl:         $(evt.target).find('[name=logoUrl]').val(),
      homeJerseyColor: $(evt.target).find('[name=homeJerseyColor]').val(),
      awayJerseyColor: $(evt.target).find('[name=awayJerseyColor]').val(),
      leagueId:        $(evt.target).find('[name=leagueName]').val(),
      seasonId:        $(evt.target).find('[name=seasonName]').val()

    };

    errors = validateTeam(team);
    // if (errors.title || errors.url)

    if (errors.name)
      return Session.set('sTeamSubmitErrors', errors);

    Meteor.call('newTeam', team, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      // let the user know the team has been created
      Session.setPersistent('sTeamId', id);
      // set sTeamNew to true after form submit so list of teams can be seen
      Session.setPersistent('sTeamNew', true);
      // hide add team form after submitting form
      Session.setPersistent('sAddTeam', false);
    });

    // client side alert
    Bert.alert('Team Created', 'success', 'growl-top-right');
  }
});
