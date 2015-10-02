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

    var myPosition = Games.findOne({
      _id: Session.get('sGameId')
    });
    // when I used arrays
    // var currPosInfo = myPosition.playerGameInfo[0];
    // return currPosInfo;
    // var currPosInfo = myPosition.playerGameInfo;
    // return currPosInfo;
    console.log(myPosition._id);
    // this is how you get to the data you want
    // console.log(myPosition.playerGameInfo[0].player02.fieldPosition);
    // console.log(Session.get('sGameId'));
  },
  sGameId: function() {
    return Session.get('sGameId');
  }
});
