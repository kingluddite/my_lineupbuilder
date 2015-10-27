Meteor.methods({
  newTeam: function(postAttributes) {
    var user,
        errors,
        team,
        teamId;

    user = Meteor.user();
    //, postWithSameLink = Players.findOne({firstName: postAttributes.firstName});

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to add a team");
    }

    // ensure the post has a name
    errors = validateTeam(postAttributes);
    // if (errors.title || errors.url)
    if (errors.name)
      throw new Meteor.Error('invalid-team', "You must enter a team name");

    check(postAttributes, {
      teamName:        String,
      coachName:       String,
      coachEmail:      String,
      logoUrl:         String,
      homeJerseyColor: String,
      awayJerseyColor: String
    });

    // pick out the whitelisted keys
    // Those on the list will be accepted, approved or recognized
    team = _.extend(_.pick(postAttributes, 'teamName', 'coachName', 'coachEmail', 'logoUrl', 'homeJerseyColor', 'awayJerseyColor'), {

      createdBy: user._id,
      author: user.username,
      teamCreated: true,
      submitted: new Date().getTime()
    });


    teamId = Teams.insert(team);

    return teamId;
  },

  removeTeam: function(teamId) {
    var user;

    user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to remove a team");
    }
    // check data is what we expect
    check(teamId, String);

    Teams.remove(teamId);
  },

  updateTeam: function(teamProperties) {
    var user;

    user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, "You need to login to remove a team");
    }

    check(teamProperties, {
      currentTeamId:   String,
      teamName:        String,
      coachName:       String,
      coachEmail:      String,
      logoUrl:         String,
      homeJerseyColor: String,
      awayJerseyColor: String
    });

    Teams.update(teamProperties.currentTeamId, {
      $set: teamProperties
    });
  }
});
