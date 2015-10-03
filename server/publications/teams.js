Meteor.publish('current-team', function publishFunction() {
  return Teams.find({
    createdBy: this.userId
  });
});
