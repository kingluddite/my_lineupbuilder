Teams = new Meteor.Collection('teams');

validateTeam = function(team) {
  var errors = {};
  // if (!post.title)
  //   errors.title = "Please fill in a headline";
  if (!team.teamName)
    errors.name = "Please enter a Team Name";
  return errors;
}
