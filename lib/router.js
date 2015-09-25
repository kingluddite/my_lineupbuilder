Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('current-team-roster'),
      Meteor.subscribe('current-team'),
      Meteor.subscribe('current-game'),
      Meteor.subscribe('map-markers')
    ];
  }
});

Router.map(function() {
  this.route('Home', {
    path: '/',
    template: 'Home'
  });

  // new team
  this.route('TeamNew', {
    path: '/teams/'
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
    // name: 'team.show',

    data: function() {
      return Teams.find(this.params._id);
    }
  });

  // player/roster page
  this.route('PlayerList', {
    path: '/players/'
  });

  // drag drop to choose starters
  this.route('StarterList', {
    path: '/starters/'
  });

  // add formation
  this.route('FormationNew', {
    path: '/formations/'
  });

  // show formation
  this.route('FormationShow', {
    path: '/games/:_id/formations/edit',
    data: function() {
      return Games.find(this.params._id);
    }
  });

  // add field positions
  this.route('PositionNew', {
    path: '/positions/'
  });

  // edit field positions
  this.route('PositionEdit', {
    path: '/positions/edit/:_id',
    data: function() {
      return Games.find(this.params._id);
    }
  });

  // list all games for this team
  this.route('GameList', {
    path: '/teams/:_id/games/'
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
    data: function() {
      return Games.findOne(this.params._id);
    }
  });

});


// var requireLogin = function(pause) {
//   if (!Meteor.user()) {
//     if (Meteor.loggingIn()) {
//       this.render(this.loadingTemplate);
//     } else {
//       this.render('accessDenied');
//     }
//     pause();
//   }
// };
// //Router.onBeforeAction('loading');
// Router.onBeforeAction(requireLogin, {
//   // only: 'tFormerPlayers'
// });
