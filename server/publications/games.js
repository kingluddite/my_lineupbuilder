Meteor.publish('current-game', function() {
  return Games.find({
    createdBy: this.userId
  });
});
