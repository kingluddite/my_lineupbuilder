Games = new Meteor.Collection('games');

Meteor.methods({
    addGame: function(postAttributes) {
        var user = Meteor.user();
        //, postWithSameLink = Players.findOne({firstName: postAttributes.firstName});

        // ensure the user is logged in
        if (!user) {
            throw new Meteor.Error(401, "You need to login to add a team");
        }

        // ensure the post has a name
        if (!postAttributes.teamName) {
            throw new Meteor.Error(422, "Please provide a Team Name");
        }

        // pick out the whitelisted keys
        // Those on the list will be accepted, approved or recognized
        var team = _.extend(_.pick(postAttributes, 'teamName', 'coachName', 'coachEmail', 'leagueName', 'logoUrl', 'homeJerseyColor', 'awayJerseyColor'), {

            createdBy: user._id,
            author: user.username,
            teamCreated: true,
            submitted: new Date().getTime()
        });


        var teamId = Teams.insert(team);

        return teamId;
    }
});
