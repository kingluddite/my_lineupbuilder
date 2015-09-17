Players = new Meteor.Collection('players');

Meteor.methods({
    addPlayer: function(postAttributes) {
        var user = Meteor.user();
        //, postWithSameLink = Players.findOne({firstName: postAttributes.firstName});

        // ensure the user is logged in
        if (!user) {
            throw new Meteor.Error(401, "You need to login to add new players");
        }

        // ensure the post has a title
        // if (!postAttributes.jerseyNumber) {
        //     throw new Meteor.Error(422, "Please provide a jersey number");
        // }

        // pick out the whitelisted keys
        // Those on the list will be accepted, approved or recognized
        // var player = _.extend(_.pick(postAttributes, 'firstName', 'lastNameInitial', 'teamId', 'fieldPosition', 'teamId', 'gameStatus', 'jerseyNumber', 'seasonFeeOwed', 'seasonFeePaid', 'playerNotes'), {
        // console.log(postAttributes);
        // how many players do we have
        var msg;
        var playerCount = Players.find().count();
        var player = {
            fullName: postAttributes,
            createdBy: user._id,
            author: user.username,
            submitted: new Date().getTime()
        };
        if (playerCount < 26) {
            var playerId = Players.insert(player);
            return playerId;
        } else {
            // msg = "You can not add any more players to your roster\n" +
            //     ". The max is 26. Please remove players from your \n" +
            //     "existing roster to make room for new players.";
            // return msg;
            return;
        }

    }
});
