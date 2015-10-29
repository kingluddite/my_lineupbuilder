// game details
Router.route('GameDateTime', {
  path: '/teams/games/date',
  layoutTemplate: 'TwoColumn',
  yieldTemplates: {
    'Footer': {
      to: 'footer'
    }
  },

  onBeforeAction: function() {
    Session.set('currentSubRoute', 'game-date-time');
    return this.next();
  }
});

// game details
Router.route('Opponent', {
  path: '/teams/games/opponent',
  layoutTemplate: 'TwoColumn',
  yieldTemplates: {
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentSubRoute', 'opponent');
    return this.next();
  }
});

/*=======================================
  =            Game Reminder         =
  =======================================*/

// yes list
Router.route('YesPlayingList', {
  path: '/games/game_reminder/yes',
  layoutTemplate: 'TwoColumnGameReminder',
  yieldTemplates: {
    'PlayerPlainList': {
      to: 'sidebar'
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
// no list
Router.route('NotPlayingList', {
  path: '/games/game_reminder/no',
  layoutTemplate: 'TwoColumnGameReminder',
  yieldTemplates: {
    'PlayerPlainList': {
      to: 'sidebar'
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

// not playing list
Router.route('NoReplyList', {
  path: '/games/game_reminder/no_reply',
  layoutTemplate: 'TwoColumnGameReminder',
  yieldTemplates: {
    'PlayerPlainList': {
      to: 'sidebar'
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

Router.route('PregameMessageEdit', {
  path: '/games/pregame_message/edit',
  layoutTemplate: 'OneColumnLayout',
  yieldTemplates: {
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'game');
    Session.set('currentSubRoute', 'pregame-message');
    return this.next();
  }

});

Router.route('PregameMessageShow', {
  path: '/games/pregame_message/show',
  layoutTemplate: 'OneColumnLayout',
  yieldTemplates: {
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'game');
    Session.set('currentSubRoute', 'pregame-message');
    return this.next();
  }

});

Router.route('PostgameSummaryEdit', {
  path: '/games/postgame_summary/edit',
  layoutTemplate: 'OneColumnLayout',
  yieldTemplates: {
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'game');
    Session.set('currentSubRoute', 'postgame-summary');
    return this.next();
  }

});

Router.route('PostgameSummaryShow', {
  path: '/games/postgame_summary/show',
  layoutTemplate: 'OneColumnLayout',
  yieldTemplates: {
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'game');
    Session.set('currentSubRoute', 'postgame-summary');
    return this.next();
  }

});

Router.route('GameStatusEdit', {
  path: '/games/game_status/edit',
  layoutTemplate: 'OneColumnLayout',
  yieldTemplates: {
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'game');
    Session.set('currentSubRoute', 'game-status');
    return this.next();
  }

});

Router.route('GameStatusShow', {
  path: '/games/game_status/show',
  layoutTemplate: 'OneColumnLayout',
  yieldTemplates: {
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'game');
    Session.set('currentSubRoute', 'game-status');
    return this.next();
  }

});



// game details
Router.route('Field', {
  path: '/teams/games/field',
  layoutTemplate: 'TwoColumn',
  yieldTemplates: {
    'Footer': {
      to: 'footer'
    }
  },

  onBeforeAction: function() {
    Session.set('currentSubRoute', 'field');
    return this.next();
  }
});
