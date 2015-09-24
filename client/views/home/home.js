Template.Home.rendered = function() {
    $(".menu-toggle").click(function(e) {
        e.preventDefault();
        $(".container").toggleClass("toggled");
    });

};

Template.Home.helpers({
    gameId: function() {
        return Session.get('sGameId');
    },
    teamId: function() {
        return Session.get('sGameId');
    },
    rosterComplete: function() {
        return Session.get('sRosterCompleted');
    },
    formationChosen: function() {
        return Session.get('sFormationChosen');
    },
    positionsNamed: function() {
        return Session.get('sPositionsNamed');
    },
    startersChosen: function() {
        return Session.get('sStartersChosen');
    },
    subsChosen: function() {
        return Session.get('sSubsChosen');
    },
    notPlayingChosen: function() {
        return Session.get('sNotPlayingChosen');
    }
});
