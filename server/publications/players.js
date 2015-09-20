Meteor.publish('current-team-roster', function() {
  return Players.find({
    createdBy: this.userId
  }, {
    sort: {
      fullName: 1
    }
    // limit: 10
  });

  // return Players.find();

});
