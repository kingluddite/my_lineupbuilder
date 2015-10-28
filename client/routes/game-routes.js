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
    Session.set('currentSubRoute', 'yes-playing');
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
    Session.set('currentSubRoute', 'not-playing');
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
    Session.set('currentSubRoute', 'no-reply');
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
