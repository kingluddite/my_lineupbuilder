Meteor.publish('current-team', function() {
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

Meteor.publish('singleTeam', function(slug) {

});
