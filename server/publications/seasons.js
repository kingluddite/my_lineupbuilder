Meteor.publish('current-season', function() {
  return Seasons.find({
    createdBy: this.userId
  });
});
