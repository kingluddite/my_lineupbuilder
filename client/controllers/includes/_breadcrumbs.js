Template.Breadcrumbs.helpers({
  teamName: function() {
    var myTeam;

    myTeam = Teams.findOne({
      _id: Session.get('sTeamId')
    }, {
      teamName: 1
    });
    if (myTeam) {
      return myTeam.teamName;
    } else {
      return false;
    }
  },

  sTeamId: function () {
    return Session.get('sTeamId');
  },

  sLeagueId: function () {
    return Session.get('sLeagueId');
  },

  sSeasonId: function() {
    return Session.get('sSeasonId');
  },

  sRosterComplete: function() {
    return Session.get('sRosterComplete');
  },
  
  sGameId: function() {
    return Session.get('sGameId');
  }
});

Template.NestedBreadcrumbs.helpers({
  sGameId: function () {
    return Session.get('sGameId');
  }
});
