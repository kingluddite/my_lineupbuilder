Meteor.methods({
    newTeam: function(postAttributes) {

        var user = Meteor.user();
        //, postWithSameLink = Players.findOne({firstName: postAttributes.firstName});

        // ensure the user is logged in
        if (!user) {
            throw new Meteor.Error(401, "You need to login to add a team");
        }

        // ensure the post has a name
        var errors = validateTeam(postAttributes);
        // if (errors.title || errors.url)
        if (errors.url)
            throw new Meteor.Error('invalid-post', "You must set a URL for your post");

        // pick out the whitelisted keys
        // Those on the list will be accepted, approved or recognized
        var team = _.extend(_.pick(postAttributes, 'teamName', 'coachName', 'coachEmail', 'logoUrl', 'homeJerseyColor', 'awayJerseyColor'), {

            createdBy: user._id,
            author: user.username,
            teamCreated: true,
            submitted: new Date().getTime()
        });


        var teamId = Teams.insert(team);

        return teamId;
    }
});
