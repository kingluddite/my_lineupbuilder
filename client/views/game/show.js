Template.GameShow.rendered = function() {
    $("[data-toggle=tooltip]").tooltip();
    $('.instructions').hide();
}

Template.GameShow.helpers({
    // if there is a team return false
    // so we can hide the add team form
    cGame: function() {
        if (Meteor.user()) {

            var myPosition = Games.findOne({
                _id: Session.get('sGameId')
            });
            var currPosInfo = myPosition.playerGameInfo[0];
            return currPosInfo;
        }
        // this is how you get to the data you want
        // console.log(myPosition.playerGameInfo[0].player02.fieldPosition);
    },

    cTeam: function() {
        return Teams.findOne({
            _id: Session.get('sTeamId')
        });
    },

    cGames: function() {
        if (Meteor.user()) {

            return Games.findOne({
                _id: Session.get('sGameId')
            });
            // var currPosInfo = myPosition.playerGameInfo[0];
            // return currPosInfo;

        }
        // this is how you get to the data you want
        // console.log(myPosition.playerGameInfo[0].player02.fieldPosition);
    },

    sGameId: function() {
        return Session.get('sGameId');
    }
});

Template.GameShow.events({
    'click .help-text': function(evt, tmpl) {
        $('.instructions').toggle(400);
        return false;
    }

});
