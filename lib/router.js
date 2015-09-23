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
    name: 'team.show',
    data: function() {
      return Teams.find(this.params._id);
    }
  });

  // player/roster page
  // formation page
  this.route('PlayerList', {
    path: '/players/'
  });

  // formation page
  this.route('FormationList', {
    path: '/formations/'
  });

  // edit formation
  this.route('FormationAdd', {
    path: '/formations/edit/:_id',
    data: function() {
      return Games.find(this.params._id);
    }
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
    path: '/games/:_id',
    name: 'game.show',
    data: function() {
      return Games.find(this.params._id);
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
