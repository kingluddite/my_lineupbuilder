Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('current-team-roster'),
      Meteor.subscribe('current-team'),
      Meteor.subscribe('current-game')
    ];
  }
});

Router.map(function() {
  this.route('tHome', {
    path: '/',
    template: 'tHome'
  });

  // show the coach his team
  this.route('tShowTeam', {
    path: '/team/:_id',
    data: function() {
      return Teams.find(this.params._id);
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
