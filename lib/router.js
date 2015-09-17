Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      // Meteor.subscribe('leagues')
    ];
  }
});

Router.map(function() {
  this.route('tHome', {
    path: '/',
    template: 'tHome'
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
