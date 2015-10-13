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

Meteor.publish('teams', function(){
  var data = Teams.find({});

  if (data) {
    return data;
  }
  return this.ready();
});

Meteor.publish('singleTeam', function(slug) {
  check(slug, String);
  var data = Teams.find({
    'slug': slug
  });
  if (data) {
    return data;
  }
  this.ready();
});
