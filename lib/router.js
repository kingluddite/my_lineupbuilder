Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('current-team-roster'),
      Meteor.subscribe('current-team'),
      Meteor.subscribe('current-game'),
      Meteor.subscribe('current-league'),
      Meteor.subscribe('current-season'),
      Meteor.subscribe('map-markers')
    ];
  }
});

/*============================
=            Home            =
============================*/

Router.map(function() {
  this.route('Home', {
    path: '/',
    template: 'Home'
  });



  /*==============================
  =            League            =
  ==============================*/
  // league list
  // new league
  this.route('LeagueList', {
    path: '/leagues',
    layoutTemplate: 'TwoColumn',
    yieldTemplates: {
      'LeagueNew': {
        to: 'sidebar'
      },
      'Footer': {
        to: 'footer'
      }
    }
  });

  // league details page
  this.route('LeagueShow', {
    path: '/leagues/:_id',
    layoutTemplate: 'TwoColumn',
    yieldTemplates: {
      'LeagueEdit': {
        to: 'sidebar'
      },
      'Footer': {
        to: 'footer'
      }
    },

    data: function() {
      return Leagues.find(this.params._id);
    }
  });



  /*==============================
  =            Season            =
  ==============================*/

  // season list
  // new season 
  this.route('SeasonList', {
    path: '/seasons',
    layoutTemplate: 'TwoColumn',
    yieldTemplates: {
      'SeasonNew': {
        to: 'sidebar'
      },
      'Footer': {
        to: 'footer'
      }
    }
  });



  // league details page
  this.route('SeasonShow', {
    path: '/seasons/:_id',
    layoutTemplate: 'TwoColumn',
    yieldTemplates: {
      'SeasonEdit': {
        to: 'sidebar'
      },
      'Footer': {
        to: 'footer'
      }
    },

    data: function() {
      return Seasons.find(this.params._id);
    }
  });


  /*============================
  =            Team            =
  ============================*/
  // team list
  // new team
  this.route('TeamList', {
    path: '/teams',
    layoutTemplate: 'TwoColumn',
    yieldTemplates: {
      'TeamNew': {
        to: 'sidebar'
      },
      'Footer': {
        to: 'footer'
      }
    }
  });

  // new team
  this.route('TeamNew', {
    path: '/teams/new'
  });

  // edit team
  this.route('TeamEdit', {
    path: '/teams/edit/:_id',
    data: function() {
      return Teams.find(this.params._id);
    }
  });

  // team details page
  this.route('TeamShow', {
    path: '/teams/:_id',
    layoutTemplate: 'TwoColumn',
    yieldTemplates: {
      'TeamEdit': {
        to: 'sidebar'
      },
      'Footer': {
        to: 'footer'
      }
    },
    // name: 'team.show',

    data: function() {
      return Teams.find(this.params._id);
    }
  });

  /*==================================
      =            Formations            =
      ==================================*/
  // this.route('FormationNew', {
  //     path: '/formations',
  //     layoutTemplate: 'TwoColumn',
  //     yieldTemplates: {
  //       'TeamNew': {
  //         to: 'sidebar'
  //       },
  //       'Footer': {
  //         to: 'footer'
  //       }
  //     }
  //   });



  // add formation
  // this.route('FormationNew', {
  //   path: '/formations/'
  // });


  // edit formation
  this.route('FormationEdit', {
    path: '/games/:_id/formations/edit',
    data: function() {
      return Games.find(this.params._id);
    }
  });

  // formation info page
  this.route('FormationInfo', {
    path: '/games/formations/info'
  });

  /*=================================
  =            Positions            =
  =================================*/

  // // add field positions
  // this.route('PositionNew', {
  //   path: '/positions/'
  // });

  // edit field positions
  // this.route('PositionEdit', {
  //   path: '/positions/edit/:_id',
  //   data: function() {
  //     return Games.find(this.params._id);
  //   }
  // });

  /*=====================================
    =            Game Reminder            =
    =====================================*/

  // game reminder page
  this.route('GameReminderShow', {
    path: '/teams/games/game_reminder/:_id',

    data: function() {
      return Teams.find(this.params._id);
    }
  });

  /*===============================
  =            Players            =
  ===============================*/
  // player list
  // new player
  this.route('PlayerList', {
    path: '/teams/:_id/players',
    layoutTemplate: 'TwoColumn',
    yieldTemplates: {
      'PlayerNew': {
        to: 'sidebar'
      },
      'Footer': {
        to: 'footer'
      }
    }
  });

  // add player
  this.route('PlayerNew', {
    path: '/players/new'
  });

  /*----------  Starters  ----------*/

  // drag drop to choose starters
  this.route('StartingList', {
    path: 'team/game/:_id/starters/',
    data: function() {
      return Games.find(this.params._id);
    }
  });

  /*----------  Subs  ----------*/

  // subs page
  this.route('SubList', {
    path: '/teams/games/subs/'
  });


  /*=============================
  =            Games            =
  =============================*/

  // game list
  // new game
  this.route('GameList', {
    path: '/teams/:_id/games',
    layoutTemplate: 'TwoColumn',
    yieldTemplates: {
      'GameNew': {
        to: 'sidebar'
      },
      'Footer': {
        to: 'footer'
      }
    }
  });


  // new game
  this.route('GameNew', {
    path: '/games/'
  });

  // edit game
  this.route('GameEdit', {
    path: '/games/edit/:_id',
    data: function() {
      return Games.find(this.params._id);
    }
  });

  // game details page
  this.route('GameShow', {
    path: '/teams/games/:_id',
    layoutTemplate: 'TwoColumn',
    yieldTemplates: {
      'FormationShow': {
        to: 'sidebar'
      },
      'Footer': {
        to: 'footer'
      }
    }
  });

  // pick your formation
  this.route('FormationNew', {
    path: '/teams/games/formations/:_id',
    layoutTemplate: 'TwoColumn',
    yieldTemplates: {
      'FieldList': {
        to: 'sidebar'
      },
      'Footer': {
        to: 'footer'
      }
    }
  });

  // pick your formation
  this.route('PositionNew', {
    path: '/teams/games/positions/:_id',
    layoutTemplate: 'TwoColumn',
    yieldTemplates: {
      'PositionList': {
        to: 'sidebar'
      },
      'Footer': {
        to: 'footer'
      }
    }
  });

  // pick your formation
  this.route('PositionEdit', {
    path: '/teams/games/positions/:_id/edit',
    layoutTemplate: 'TwoColumn',
    yieldTemplates: {
      'PositionList': {
        to: 'sidebar'
      },
      'Footer': {
        to: 'footer'
      }
    }
  });

  // pick your starting linup
  this.route('PlayerPlainList', {
    path: '/teams/games/lineups/:_id',
    layoutTemplate: 'TwoColumn',
    yieldTemplates: {
      'StartingFieldList': {
        to: 'sidebar'
      },
      'Footer': {
        to: 'footer'
      }
    }
  });

});

// var requireLogin = function(pause) {
//   if (!Meteor.user()) {
//     this.render('AccessDenied');
//   }
// };
// Router.onBeforeAction('loading');

// Router.onBeforeAction(requireLogin, {
//   only: ['GameEdit', 'GameNew', 'PositionEdit', 'PositionNew',
//     'FormationNew', 'TeamEdit', 'TeamNew'
//   ]
// });
