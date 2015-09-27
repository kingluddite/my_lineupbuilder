// Make all subs draggable
Template.SubItem.rendered = function(evt, template) {
  $("ul.subs li").draggable({
    revert: true,
    appendTo: "body",
    helper: "clone"
  });




  // console.log(arrWithPlayerNames[0]);
  // return arrWithPlayerNames;
};

// Template.SubItem.helpers({
//   cFullName: function(evt, template) {
//     // console.log(currentGame.subs);
//     var currentGame = Games.findOne({
//       _id: Session.get('sGameId')
//     });

//     var mySubs = currentGame.subs;
//     var arrWithPlayerNames = [];
//     for (var i = 0; i < mySubs.length; i++) {
//       var player = Players.findOne({
//         _id: mySubs[i]
//       });
//       var playerFullName = player.fullName;
//       arrWithPlayerNames.push(playerFullName);
//     }
//     return playerFullName;
//     // return arrWithPlayerNames;

//   }
// });



// change the status of the player to none
//  which removes them from the sub list
Template.SubItem.events({
  'click .trash': function(evt, template) {
    addAlertClass('Removed', 'sub');
    Players.update(this._id, {
        $set: {
          status: "none"
        }
      },
      function(error) {
        if (error) {
          alert(error.reason);
        }
      });
  },
  'mousedown li': function(evt, template) {
    Session.set('sPlayerId', this._id);
    Session.set('sPlayerStatus', this.status);
    Session.set('sPlayerStatus', this.game_reminder);

  }
});
