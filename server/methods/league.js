Meteor.methods({
  newLeague: function(postAttributes) {
    var user,
        errors,
        league,
        leagueId;

    user = Meteor.user();
    //, postWithSameLink = Players.findOne({firstName: postAttributes.firstName});

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to add a league");
    }

    // always check data to make sure its what you expect
    check(postAttributes, {
      leagueName: String,
      leagueZip:  String,
      teamId:     String
    });

    // ensure the post has a name
    errors = validateLeague(postAttributes);
    // if (errors.title || errors.url)
    if (errors.name)
      throw new Meteor.Error('invalid-league', "You must enter a league name");

    // pick out the whitelisted keys
    // Those on the list will be accepted, approved or recognized
    league = _.extend(_.pick(postAttributes, 'leagueName', 'leagueZip', 'teamId'), {

      createdBy: user._id,
      submitted: new Date().getTime()
    });


    leagueId = Leagues.insert(league);

    return leagueId;
  },

  removeLeague: function(leagueId) {
    var user;
    console.log(leagueId);
    user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to remove a league");
    }
    // check data is what we expect
    check(leagueId, String);

    Leagues.remove(leagueId);
  }
});
