Meteor.methods({
  newSeason: function(postAttributes) {
    var user,
        errors,
        season,
        seasonId;

    user = Meteor.user();
    //, postWithSameLink = Players.findOne({firstName: postAttributes.firstName});

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to add a season");
    }

     check(postAttributes, {
      seasonName:       String,
      teamId:           String,
      leagueId:         String,
      seasonStartDate:  Date,
      seasonEndDate:    Date,
      playoffStartDate: Date,
      playoffEndDate:   Date,
      seasonFee:        Number
    });

    // ensure the post has a name
    errors = validateSeason(postAttributes);
    // if (errors.title || errors.url)
    if (errors.name)
      throw new Meteor.Error('invalid-season', "You must enter a season name");

    // pick out the whitelisted keys
    // Those on the list will be accepted, approved or recognized
    season = _.extend(_.pick(postAttributes, 
                  'seasonName', 
                  'teamId', 
                  'leagueId',
                  'seasonStartDate', 
                  'seasonEndDate', 
                  'playoffStartDate', 
                  'playoffEndDate', 
                  'seasonFee'), {

      createdBy: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    seasonId = Seasons.insert(season);

    return seasonId;
  },

  updateSeason: function(postAttributes) {
    var user,
        errors,
        season,
        seasonId;

    user = Meteor.user();
    //, postWithSameLink = Players.findOne({firstName: postAttributes.firstName});

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to update a season");
    }

     check(postAttributes, {
      _id:              String,
      seasonName:       String,
      teamId:           String,
      leagueId:         String,
      seasonStartDate:  Date,
      seasonEndDate:    Date,
      playoffStartDate: Date,
      playoffEndDate:   Date,
      seasonFee:        Number
    });

    // ensure the post has a name
    errors = validateSeason(postAttributes);
    // if (errors.title || errors.url)
    if (errors.name) {
      throw new Meteor.Error('invalid-season', "You must enter a season name");
    }

    // pick out the whitelisted keys
    // Those on the list will be accepted, approved or recognized
    season = _.extend(_.pick(postAttributes, 
                  'seasonName', 
                  'teamId', 
                  'leagueId',
                  'seasonStartDate', 
                  'seasonEndDate', 
                  'playoffStartDate', 
                  'playoffEndDate', 
                  'seasonFee'), {

      createdBy: user._id,
      submitted: new Date().getTime()
    });

    Seasons.update(postAttributes._id, {
      $set: postAttributes
    });
  },

  removeSeason: function(seasonId) {
    var user;

    user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to delete a season");
    }
    // check data is what we expect
    check(seasonId, String);

    Seasons.remove(seasonId);
  },
});
