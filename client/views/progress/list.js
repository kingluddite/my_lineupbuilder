Template.ProgressList.helpers({
  teamId: function() {
    return Session.get('sTeamId');
  },
  gameId: function() {
    return Session.get('sGameId');
  },
  // when Roster completed checkbox checked the follow styles
  //  get added to the roster completed section of the progress box
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
