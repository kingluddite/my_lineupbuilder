// have to wait for sub (until data is ready)
// add this and an if statement in template
// https://docs.meteor.com/#/full/Blaze-TemplateInstance-subscribe
Template.PositionList.onCreated(function() {
  this.subscribe('current-game');
});

Template.PositionList.helpers({
  // if there is a team return false
  // so we can hide the add team form
  cGame: function() {
    var myPosition,
        currPosInfo;

    myPosition = Games.findOne({
      _id: Session.get('sGameId')
    });

    // first check if playerGameInfo exists 
    //  (we create it after naming positions)
    if (Session.get('sPositionsNamed')) {
      currPosInfo = myPosition.playerGameInfo[0];
      return currPosInfo;
    }
  },
  sGameId: function() {
    return Session.get('sGameId');
  }
});
