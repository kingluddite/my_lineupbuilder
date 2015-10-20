Meteor.methods({
  newSeason: function(postAttributes) {

    var user = Meteor.user();
    //, postWithSameLink = Players.findOne({firstName: postAttributes.firstName});

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to add a season");
    }

     check(postAttributes, {
      seasonName: String,
      teamId:     String,
      leagueId:   String
    });

    // ensure the post has a name
    var errors = validateSeason(postAttributes);
    // if (errors.title || errors.url)
    if (errors.name)
      throw new Meteor.Error('invalid-season', "You must enter a season name");

    // pick out the whitelisted keys
    // Those on the list will be accepted, approved or recognized
    var season = _.extend(_.pick(postAttributes, 'seasonName', 'teamId', 'leagueId'), {

      createdBy: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });


    var seasonId = Seasons.insert(season);

    return seasonId;
  }
});
