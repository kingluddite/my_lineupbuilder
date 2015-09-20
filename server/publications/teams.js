Meteor.publish('current-team', function() {
  return Teams.find({
    createdBy: this.userId
  });
});
