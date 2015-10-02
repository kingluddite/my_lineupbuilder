Leagues = new Meteor.Collection('leagues');

validateLeague = function(league) {
  var errors = {};
  // if (!post.title)
  //   errors.title = "Please fill in a headline";
  if (!league.leagueName)
    errors.name = "Please enter a League Name";
  return errors;
}
