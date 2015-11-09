Router.route('Dashboard', {
  path: '/dashboard',
  template: 'Dashboard',
  onBeforeAction: function() {
    Session.set('currentRoute', 'dashboard');
    return this.next();
  }
});

Router.route('Invites', {
  path: '/invites',
  template: 'Invites',
  onBeforeAction: function() {
    Session.set('currentRoute', 'invites');
    return this.next();
  }
});

/*===========================
=            API            =
===========================*/
Router.route('apiKey', {
  path: '/api-key',
  template: 'apiKey'
});


/*============================
=            TEAM            =
============================*/

Router.route('TeamList', {
  path: '/teams/new',
  template: 'TeamList',
  layoutTemplate: 'TwoColumn',
  yieldTemplates: {
    'TeamNew': {
      to: 'sidebar'
    },
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'teams');
    return this.next();
  }
});

Router.route('TeamEdit', {
  path: '/teams/:_id/edit',
  layoutTemplate: 'OneColumnLayout',
  yieldTemplates: {
    'Footer': {
      to: 'footer'
    }
  },
  data: function() {
    return Teams.find(this.params._id);
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'team');
    return this.next();
  }
});

Router.route('TeamShow', {
  path: '/teams/:_id/show',
  layoutTemplate: 'OneColumnLayout',
  yieldTemplates: {
    'Footer': {
      to: 'footer'
    }
  },
  data: function() {
    return Teams.find(this.params._id);
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'team');
    return this.next();
  }
});

/*============================
=            League            =
============================*/

Router.route('LeagueList', {
  path: '/leagues/new',
  template: 'LeagueList',
  layoutTemplate: 'TwoColumn',
  yieldTemplates: {
    'LeagueNew': {
      to: 'sidebar'
    },
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'leagues');
    return this.next();
  }
});

Router.route('LeagueEdit', {
  path: '/leagues/:_id/edit',
  layoutTemplate: 'OneColumnLayout',
  yieldTemplates: {
    'Footer': {
      to: 'footer'
    }
  },
  data: function() {
    return Leagues.find(this.params._id);
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'league');
    return this.next();
  }
});

Router.route('LeagueShow', {
  path: '/leagues/:_id',
  layoutTemplate: 'OneColumnLayout',
  yieldTemplates: {
    'Footer': {
      to: 'footer'
    }
  },
  data: function() {
    return Leagues.find(this.params._id);
  },

  onBeforeAction: function() {
    Session.set('currentRoute', 'league');
    return this.next();
  }
});

/*==============================
=            Season            =
==============================*/

// season list
Router.route('SeasonList', {
  path: '/seasons',
  layoutTemplate: 'TwoColumn',
  // new season
  yieldTemplates: {
    'SeasonNew': {
      to: 'sidebar'
    },
    'Footer': {
      to: 'footer'
    }
  },

  onBeforeAction: function() {
    Session.set('currentRoute', 'seasons');
    Session.setPersistent('sSeasonId', true);
    return this.next();
  }
});

// league details page
Router.route('SeasonEdit', {
  path: '/seasons/:_id',
  layoutTemplate: 'OneColumnLayout',
  yieldTemplates: {
    'Footer': {
      to: 'footer'
    }
  },

  data: function() {
    return Seasons.find(this.params._id);
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'season');
    return this.next();
  }
});

/*===============================
=            Players            =
===============================*/
// player list
Router.route('PlayerList', {
  path: '/teams/:_id/players',
  layoutTemplate: 'TwoColumn',
  // new player
  yieldTemplates: {
    'PlayerNew': {
      to: 'sidebar'
    },
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'players');
    return this.next();
  }
});

// add player
Router.route('PlayerNew', {
  path: '/players/new'
});

/*=============================
=            Games            =
=============================*/

// game list & new game
Router.route('GameList', {
  path: '/teams/:_id/games',
  layoutTemplate: 'TwoColumn',
  yieldTemplates: {
    'GameNew': {
      to: 'sidebar'
    },
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'games');
    return this.next();
  }
});

// edit game
Router.route('GameEdit', {
  path: '/games/edit/:_id',
  data: function() {
    return Games.find(this.params._id);
  }
});

// game details
Router.route('GameShow', {
  path: '/teams/games/:_id',
  layoutTemplate: 'TwoColumn',
  yieldTemplates: {
    'GameItem': {
      to: 'sidebar'
    },
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'game');
    return this.next();
  }
});

// Single Game Modular Attributes


/*=====================================
  =            Game Reminder            =
  =====================================*/

Router.route('PlayerGameReminderList', {
  path: '/teams/games/game_reminder/:_id',
  layoutTemplate: 'GameReminder',
  yieldTemplates: {
    'YesPlayingList': {
      to: 'middle'
    },
    'NoReplyList': {
      to: 'sidebar-top'
    },
    'NotPlayingList': {
      to: 'sidebar-bottom'
    },
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'game');
    Session.set('currentSubRoute', 'game-reminder');
    return this.next();
  }
});

/*=================================
=            Formation            =
=================================*/

// pick your formation & field
Router.route('FormationNew', {
  path: '/teams/games/formations/:_id',
  layoutTemplate: 'TwoColumn',
  yieldTemplates: {
    'FieldList': {
      to: 'sidebar'
    },
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'formation-new');
    return this.next();
  }
});

// edit your formation & field
Router.route('FormationEdit', {
  path: '/teams/games/formations/:_id/edit',
  layoutTemplate: 'TwoColumn',
  yieldTemplates: {
    'FieldList': {
      to: 'sidebar'
    },
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'formation-edit');
    return this.next();
  }
});

// formation info page
Router.route('FormationInfo', {
  path: '/games/formations/info',
  onBeforeAction: function() {
    Session.set('currentRoute', 'formation-info');
    return this.next();
  }
});

/*=================================
  =            Positions            =
  =================================*/

// add positions and list them
Router.route('PositionNew', {
  path: '/teams/games/positions/:_id',
  layoutTemplate: 'TwoColumn',
  yieldTemplates: {
    'PositionList': {
      to: 'sidebar'
    },
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'position-new');
    return this.next();
  }
});

// edit position and list positions
Router.route('PositionList', {
  path: '/teams/games/positions/:_id/edit',
  layoutTemplate: 'TwoColumn',
  yieldTemplates: {
    'PositionEdit': {
      to: 'sidebar'
    },
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'positions');
    return this.next();
  }
});

Router.route('StartingLineupList', {
  path: '/teams/games/lineup_starters/:_id',
  layoutTemplate: 'StartersAndSubs',
  yieldTemplates: {
    'StartingList': {
      to: 'sidebar-top'
    },
    'StartingFieldList': {
      to: 'right'
    },
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'starters');
    return this.next();
  }

});
/*=======================================
  =            Starting Lineup            =
  =======================================*/

// pick your starting linup
Router.route('PlayerPlainList', {
  path: '/teams/games/lineups/:_id',
  layoutTemplate: 'TwoColumn',
  yieldTemplates: {
    'StartingFieldList': {
      to: 'sidebar'
    },
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'lineup');
    return this.next();
  }
});
