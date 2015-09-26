Games = new Meteor.Collection('games');

Meteor.methods({
  newGame: function(postAttributes) {
    var user = Meteor.user();
    //, postWithSameLink = Players.findOne({firstName: postAttributes.firstName});

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to add a team");
    }

    // ensure the post has a name
    if (!postAttributes.gameDate) {
      throw new Meteor.Error(422, "Please provide a Game Date");
    }
    if (!postAttributes.gameTime) {
      throw new Meteor.Error(422, "Please provide a Game Time");
    }

    // pick out the whitelisted keys
    // Those on the list will be accepted, approved or recognized
    var game = _.extend(_.pick(postAttributes,
      'teamId',
      'gameDate',
      'gameTime',
      'opponentName',
      'fieldName',
      'fieldUrl',
      'homeTeam'), {

      createdBy: user._id,
      author: user.username,
      gameCreated: true,
      submitted: new Date().getTime()
    });


    var gameId = Games.insert(game);

    return gameId;
  },
  newPlayerInfo: function(postAttributes) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to add a team");
    }

    var allGamePositions = {
      playerGameInfo: postAttributes,
      lastModified: new Date().getTime()
    }

    Games.insert(allGamePositions);
  },
  updateStarter: function(gameId, postAttributes) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to add a team");
    }

    // console.log(postAttributes.pla);

    // Games.update({
    //     _id: gameId,
    //     'playerGameInfo.player02': 'Foo Fighters'
    //       // 'playerGameInfo.player02.fieldPosition': 'sdf'
    //   }, {

    //   Games.update(gameId, {
    //       $set: {
    //         playerGameInfo: playerStarter
    //       }
    //     }
    //   });
    var setModifier = {
      $set: {}
    };
    setModifier.$set['playerGameInfo.' + postAttributes.playerDivNum + '.playerId'] = 'TBD';

    console.log(postAttributes.oldPlayerId);


    Games.update({
      _id: gameId,
      "playerGameInfo.player11.playerId": postAttributes.oldPlayerId
    }, {
      $set: {
        "playerGameInfo.$.player11.playerId": postAttributes.playerId
      }
    });

    //   }
    // });

  }
});
