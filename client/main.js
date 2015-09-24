// get id of player when you click on them
Session.setDefaultPersistent("sPlayerId", null);
// keep track of where you are - is the roster completed
Session.setDefaultPersistent("sGameId", null);
Session.setDefaultPersistent("sTeamId", null);
// sessions to keep track of what stuff was completed
// we will hide/change UI depending on their state
Session.setDefaultPersistent("sTeamCreated", false);
Session.setDefaultPersistent("sGameCreated", false);
Session.setDefaultPersistent("sRosterComplete", false);
Session.setDefaultPersistent("sFormationCreated", false);
Session.setDefaultPersistent("sFormationChosen", false);
Session.setDefaultPersistent("sPositionsNamed", false);
Session.setDefaultPersistent("sStartersChosen", false);
Session.setDefaultPersistent("sSubsChosen", false);
Session.setDefaultPersistent("sNotPlayingChosen", false);

Template.body.events({
    'click .panel-heading span.clickable': function(evt) {
        // console.log('works');
        if ($(this).hasClass('panel-collapsed')) {
            // expand the panel
            $(this).parents('.panel').find('.panel-body').slideDown();
            $(this).removeClass('panel-collapsed');
            $(this).find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        } else {
            // collapse the panel
            $(this).parents('.panel').find('.panel-body').slideUp();
            $(this).addClass('panel-collapsed');
            $(this).find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        }
    }
});
