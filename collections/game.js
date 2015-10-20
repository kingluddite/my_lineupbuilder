Games = new Meteor.Collection('games');

Games.allow({
  update: function (userId, doc) {
    return true;
  }
})
