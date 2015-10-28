Meteor.methods({
  newGame: function(postAttributes) {
    var user,
        game,
        gameId;

    user = Meteor.user();
    //, postWithSameLink = Players.findOne({firstName: postAttributes.firstName});

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to add a team");
    }

     check(postAttributes, {
      teamId:       String,
      gameDateTime: Date,
      opponentName: String,
      fieldName:    String,
      fieldUrl:     String,
      homeTeam:     Boolean
    });

    // ensure the post has a name
    if (!postAttributes.gameDateTime) {
      throw new Meteor.Error(422, "Please provide a Game Date/Time");
    }

    // pick out the whitelisted keys
    // Those on the list will be accepted, approved or recognized
    game = _.extend(_.pick(postAttributes,
      'teamId',
      'gameDateTime',
      'opponentName',
      'fieldName',
      'fieldUrl',
      'homeTeam'), {

      leagueName: "NA",
      seasonName: "NA",
      createdBy: user._id,
      author: user.username,
      gameCreated: true,
      submitted: new Date().getTime()
    });

    gameId = Games.insert(game);

    return gameId;
  },

  newPlayerInfo: function(postAttributes) {
    var user,
        allGamePositions;

    user = Meteor.user();

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to add a team");
    }

    allGamePositions = {
      playerGameInfo: postAttributes,
      lastModified: new Date().getTime()
    }

    Games.insert(allGamePositions);
  },

  updatePregameMessage: function(gameProperties) {
    var user;
console.log('yo');
    user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, "You need to login to add a pregame message");
    }

    check(gameProperties, {
      currentGameId:   String,
      pregameMessage:  String
    });

    Games.update(gameProperties.currentGameId, {
      $set: gameProperties
    });
  },

  updateStarter: function(gameId, postAttributes) {
    var user,
        playerMatchObj,
        setPlayerObj;

    user = Meteor.user();

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to add a team");
    }
    // check date to make sure it's what you expect
    check(gameId,     String);

    check(postAttributes, {
      playerDivNum:   String,
      playerId:       String,
      playerFullName: String
    });

    /*=================================================
    =            dynamic object properties            =
    =================================================*/
    // had problems and spent hours on this
    // if you need to dynamically change an object property
    // you need to create and object and use this syntax 
    // myObj["string" + variable + "string"] = something
    //  I do that for two keys below
    playerMatchObj = {};
    playerMatchObj._id = gameId;
    playerMatchObj['playerGameInfo.' + postAttributes.playerDivNum + '.playerId'] = postAttributes.oldPlayerId;
    playerMatchObj['playerGameInfo.' + postAttributes.playerDivNum + '.playerFullName'] = postAttributes.oldPlayerFullName;

    setPlayerObj = {};
    setPlayerObj['playerGameInfo.$.' + postAttributes.playerDivNum + '.playerId'] = postAttributes.playerId;
    setPlayerObj['playerGameInfo.$.' + postAttributes.playerDivNum + '.playerFullName'] = postAttributes.playerFullName;

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
