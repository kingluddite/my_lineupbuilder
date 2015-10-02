Meteor.publish('current-league', function() {
  return Leagues.find({
    createdBy: this.userId
  });
});
