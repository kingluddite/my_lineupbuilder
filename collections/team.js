Teams = new Meteor.Collection('teams');

validateTeam = function(team) {
    var errors = {};
    // if (!post.title)
    //   errors.title = "Please fill in a headline";
    if (!team.logoUrl)
        errors.url = "Please fill in a URL";
    return errors;
}
