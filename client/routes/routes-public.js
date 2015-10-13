/*
* Routes: Public
* Routes that are visible to all (public) users.
*/

Router.route('latestTeams', {
  path: '/',
  template: 'latestTeams',
  subscriptions: function() {
    return Meteor.subscribe('teams');
  },
  
  data: function() {
    var teams = Teams.find({});
    console.log(teams);
    if (teams) {
      return teams;
    }
  },
  onBeforeAction: function(){
    Session.set('currentRoute', 'latest-teams');
    Session.set('isSingleTeam', false);
    this.next();
  }
});

/* single team */
Router.route('singleTeam', {
  name: 'team.show',
  path: '/teams/:slug',
  template: 'singleTeam',
  subscriptions: function() {
    return Meteor.subscribe('singleTeam', this.params.slug);
  },
  data: function() {
    var team = Teams.findOne({
      'slug': this.params.slug
    });
    if (team) {
      return team;
    }
  },
  onBeforeAction: function() {
    Session.set('sCurrentRoute', null);
    Session.set('sIsSingleTeam', true);
    this.next();
  }
});

Router.route('login', {
  path: '/login',
  template: 'login',
  onBeforeAction: function(){
    Session.set('currentRoute', 'login');
    this.next();
  }
});

Router.route('signup', {
  path: '/signup',
  template: 'signup',
  onBeforeAction: function(){
    Session.set('currentRoute', 'signup');
    this.next();
  }
});


Router.route('recover-password', {
  path: '/recover-password',
  template: 'recoverPassword',
  onBeforeAction: function(){
    Session.set('currentRoute', 'recover-password');
    this.next();
  }
});

Router.route('reset-password', {
  path: '/reset-password/:token',
  template: 'resetPassword',
  onBeforeAction: function() {
    Session.set('currentRoute', 'reset-password');
    Session.set('resetPasswordToken', this.params.token);
    this.next();
  }
});
