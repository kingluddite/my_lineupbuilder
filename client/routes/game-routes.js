// game details
Router.route('GameDateTime', {
  path: '/teams/games/date',
  layoutTemplate: 'TwoColumn',
  yieldTemplates: {
    'Footer': {
      to: 'footer'
    }
  },
  waitOn: function() {
    return [
      Meteor.subscribe('current-game'),
      Meteor.subscribe('current-team-roster')
    ]
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
  waitOn: function() {
    return [
      Meteor.subscribe('current-game'),
      Meteor.subscribe('current-team-roster'),
      Meteor.subscribe('current-team')
    ]
  },
  onBeforeAction: function() {
    Session.set('currentSubRoute', 'opponent');
    return this.next();
  }
});

/*=======================================
  =            Game Reminder         =
  =======================================*/

// pick your starting linup
Router.route('CompleteRoster', {
  path: '/teams/games/game_reminder',
  layoutTemplate: 'TwoColumn',
  yieldTemplates: {
    'YesPlayingList': {
      to: 'sidebar'
    },
    'Footer': {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'lineup');
    return this.next();
  },
  waitOn: function() {
    return [
      Meteor.subscribe('current-game'),
      Meteor.subscribe('current-team-roster'),
      Meteor.subscribe('current-team')
    ]
  }
});

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
    Session.set('currentRoute', 'yes-playing');
    return this.next();
  },
  waitOn: function() {
    return [
      Meteor.subscribe('current-game'),
      Meteor.subscribe('current-team-roster'),
      Meteor.subscribe('current-team')
    ]
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
    Session.set('currentRoute', 'no-playing');
    return this.next();
  },
  waitOn: function() {
    return [
      Meteor.subscribe('current-game'),
      Meteor.subscribe('current-team-roster'),
      Meteor.subscribe('current-team')
    ]
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
    Session.set('currentRoute', 'no-reply');
    return this.next();
  },
  waitOn: function() {
    return [
      Meteor.subscribe('current-game'),
      Meteor.subscribe('current-team-roster'),
      Meteor.subscribe('current-team')
    ]
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
  waitOn: function() {
    return [
      Meteor.subscribe('current-game'),
      Meteor.subscribe('current-team-roster')
    ]
  },
  onBeforeAction: function() {
    Session.set('currentSubRoute', 'field');
    return this.next();
  }
});
