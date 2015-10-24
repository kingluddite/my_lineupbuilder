Meteor.publish('current-team', function() {
  var user;
  
  user = Meteor.users.findOne(this.userId);
  if (user) {
    // if (user.emails[0].verified) {
    return Teams.find({
      createdBy: this.userId
    });
    // }
  } else {
    return;
  }

});
