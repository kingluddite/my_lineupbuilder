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
Session.setDefaultPersistent("sPositionsSet", false);
Session.setDefaultPersistent("sStartersChosen", false);
Session.setDefaultPersistent("sSubsChosen", false);
Session.setDefaultPersistent("sNotPlayingChosen", false);

/*==================================================
=            Application Wide Templates            =
==================================================*/
/* apply to templates globally */

/*=================================================
=            Global Client Side Alerts            =
=================================================*/

// Change Bert's time on screen to be two seconds instead of the 
// default three and a half.
Bert.defaults.hideDelay = 2000;

// // Change Bert's default type to be a warning instead of default.
Bert.defaults.type = 'warning';
// // Default Bert icon
Bert.defaults.icon = 'fa-bolt';

// // Change Bert's default style to be a growl-top-right 
// // instead of fixed-top.
Bert.defaults.style = 'growl-top-right';

Template.body.rendered = function() {
  $('.instructions').hide();
};

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

Meteor.startup(function() {

  WebFontConfig = {
    // google: { families: [ 'Roboto Slab:700,400:latin', 'Oswald:400', 'Mouse Memoirs' ] }
    google: { families: [ 'Roboto Slab:700,400:latin', 'Open Sans' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
    console.log("async fonts loaded", WebFontConfig);
  })();

})
