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


    // find out if the roster has reached its max value
    var playerCount = Players.find().count();
    // pick out the whitelisted keys
    // Those on the list will be accepted, approved or recognized
    var player = _.extend(_.pick(postAttributes, 'teamId', 'fullName'), {
      // how many players do we have

      createdBy: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });
    // console.log('player count is ' + playerCount);
    // console.log('server postAtt: ' + postAttributes);
    // console.log('player: ' + player);

    if (playerCount < 26) {
      var playerId = Players.insert(player);
      return playerId;
    } else {

      return;
    }

  }
});
