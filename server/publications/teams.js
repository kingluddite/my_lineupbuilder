Meteor.publish('current-team', function() {
  user = Meteor.users.findOne({
    _id: this.userId
  });
  if (user) {
    // if (user.emails[0].verified) {
    return Teams.find({
      createdBy: this.userId
    });
    // }
  }

});
