Meteor.methods({
  newPlayer: function(postAttributes) {
    var user = Meteor.user();
    //, postWithSameLink = Players.findOne({firstName: postAttributes.firstName});

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to add new players");
    }

    // ensure the post has a player name
    // if (!postAttributes.fullName) {
    //   throw new Meteor.Error(422, "Please provide a player name");
    // }
    check(postAttributes, {
      teamId:   String,
      fullName: String
    });

    // find out if the roster has reached its max value
    // make sure to get the teamId session value and
    //  filter the collection by it
    var playerCount = Players.find({
      teamId: postAttributes.teamId
    }).count();
    // pick out the whitelisted keys
    // Those on the list will be accepted, approved or recognized
    var player = _.extend(_.pick(postAttributes, 'teamId', 'fullName'), {
      // how many players do we have
 
      jerseyNumber: "0", // add default 0 so we can update later
      createdBy: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    // as long as our roster doesn't have more than 25 players we insert the
    // player
    if (playerCount < 26) {
      var playerId = Players.insert(player);
      return playerId;
    } else {
      // we do nothing if > 26 and return to the client
      return;
    }

  },

  removePlayer: function(playerId) {
    var user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to remove a team");
    }
    // check data is what we expect
    check(playerId, String);

    Players.remove(playerId);
  }
});
