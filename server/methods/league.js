Meteor.methods({
  newLeague: function(postAttributes) {

    var user = Meteor.user();
    //, postWithSameLink = Players.findOne({firstName: postAttributes.firstName});

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to add a team");
    }

    // ensure the post has a name
    var errors = validateLeague(postAttributes);
    // if (errors.title || errors.url)
    if (errors.name)
      throw new Meteor.Error('invalid-league', "You must enter a league name");

    // pick out the whitelisted keys
    // Those on the list will be accepted, approved or recognized
    var league = _.extend(_.pick(postAttributes, 'leagueName', 'teamId'), {

      createdBy: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });


    var leagueId = Leagues.insert(league);

    return leagueId;
  }
});
