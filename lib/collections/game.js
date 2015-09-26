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

    /*=================================================
    =            dynamic object properties            =
    =================================================*/
    // had problems and spent hours on this
    // if you need to dynamically change an object property
    // you need to create and object and use this syntax 
    // myObj["string" + variable + "string"] = something
    //  I do that for two keys below
    var playerMatchObj = {};
    playerMatchObj._id = gameId;
    playerMatchObj['playerGameInfo.' + postAttributes.playerDivNum + '.playerId'] = postAttributes.oldPlayerId;

    var setPlayerObj = {};
    setPlayerObj['playerGameInfo.$.' + postAttributes.playerDivNum + '.playerId'] = postAttributes.playerId;

    //  in order to use update with the $ (position mongo query)
    //  collection.update(obj1, {$set: obj2 });
    //    obj1 will query your games collection for
    //    playerGameInfo.playerN.playerId = 'oldPlayerId#'
    //    obj2 will, once obj1 finds what specifically we want to update
    //    (a property inside an object inside another object)
    //     and use the $ position query mongo operator
    //     to update the playerId with the new player Id we are dropping
    Games.update(playerMatchObj, {
      $set: setPlayerObj
    });

  }
});
