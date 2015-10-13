Router.route('Dashboard', {
  path: '/dashboard',
  template: 'Dashboard',
  waitOn: function() {
    return Meteor.subscribe('userData');
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'dashboard');
    return this.next();
  }
});

Router.route('Invites', {
  path: '/invites',
  template: 'Invites',
  waitOn: function() {
    return Meteor.subscribe('/invites');
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'invites');
    return this.next();
  }
});
