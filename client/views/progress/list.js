Template.tHome.rendered = function() {
  // when page loads hide the player add message box
  // Session.get('sTeamCreated');
  // Session.get('sGameCreated');
  // Session.get('sRosterComplete');

};

Template.tProgress.helpers({
  teamCreatedStatus: function() {
    if (!Session.get('sGameCreated')) {
      $('.team-created').html('<span> Team Created</span>');
      $('.team-created span').css('text-decoration', 'none');
      $('.team-created').removeClass('text-muted');
      return Session.get('sTeamCreated');
    } else {
      $('.team-created').html('<i class="fa fa-check"></i> <span> Team Created</span>');
      $('.team-created span').css('text-decoration', 'line-through');
      $('.team-created').addClass('text-muted');
    }
  },
  teamId: function() {
    return Session.get('sTeamId');
  },
  gameCreatedStatus: function() {
    if (!Session.get('sGameCreated')) {
      $('.game-created').html('<span> game Created</span>');
      $('.game-created span').css('text-decoration', 'none');
      $('.game-created').removeClass('text-muted');
      return Session.get('sGameCreated');
    } else {
      $('.game-created').html('<i class="fa fa-check"></i> <span> Game Created</span>');
      $('.game-created span').css('text-decoration', 'line-through');
      $('.game-created').addClass('text-muted');
    }
  },
  rosterCreatedStatus: function() {
    if (!Session.get('sRosterComplete')) {
      $('.roster-created').html('<span> Roster Created</span>');
      $('.roster-created span').css('text-decoration', 'none');
      $('.roster-created').removeClass('text-muted');
      return Session.get('sRosterComplete');
    } else {
      $('.roster-created').html('<i class="fa fa-check"></i> <span> Roster Created</span>');
      $('.roster-created span').css('text-decoration', 'line-through');
      $('.roster-created').addClass('text-muted');
    }
  }
});
