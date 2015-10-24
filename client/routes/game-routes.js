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
