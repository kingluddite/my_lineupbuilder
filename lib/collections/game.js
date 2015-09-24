Games = new Meteor.Collection('games');

Meteor.methods({
    newGame: function(postAttributes) {
        var user = Meteor.user();
        //, postWithSameLink = Players.findOne({firstName: postAttributes.firstName});

        // ensure the user is logged in
        if (!user) {
            throw new Meteor.Error(401, "You need to login to add a team");
        }

        // ensure the post has a name
        if (!postAttributes.gameDate) {
            throw new Meteor.Error(422, "Please provide a Game Date");
        }
        if (!postAttributes.gameTime) {
            throw new Meteor.Error(422, "Please provide a Game Time");
        }

        // pick out the whitelisted keys
        // Those on the list will be accepted, approved or recognized
        var game = _.extend(_.pick(postAttributes,
            'gameDate',
            'gameTime',
            'opponentName',
            'fieldName',
            'fieldUrl',
            'homeTeam'), {

            createdBy: user._id,
            author: user.username,
            gameCreated: true,
            submitted: new Date().getTime()
        });


        var gameId = Games.insert(game);

        return gameId;
    }
});
