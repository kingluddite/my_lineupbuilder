Teams = new Meteor.Collection('teams');

validateTeam = function(team) {
  var errors = {};
  // if (!post.title)
  //   errors.title = "Please fill in a headline";
  if (!team.teamName)
    errors.name = "Please enter a Team Name";
  return errors;
}

/*=============================
=            Allow            =
=============================*/
Teams.allow({
  insert: function() {
    // Disallow inserts on the client by default
    return false;
  },
  update: function() {
    // Disallow updates on the client by default
    return false;
  },
  remove: function() {
    // Disallow removes on the client by default
    return false;
  }
});

/*============================
=            Deny            =
============================*/
Teams.deny({
  insert: function() {
    // Deny inserts on the client by default
    return true;
  },
  update: function() {
    // Deny updates on the client by default
    return true;
  },
  remove: function() {
    // Deny removes on the client by default
    return true;
  }
});
