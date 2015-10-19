

// // /*============================
// // =            Home            =
// // ============================*/

// Router.map(function() {
// //   // this.route('Home', {
// //   //   path: '/',
// //   //   layoutTemplate: 'layout',
// //   //   yieldTemplates: {
// //   //     'Footer': {
// //   //       to: 'footer'
// //   //     }
// //   //   },
// //   //   waitOn: function() {
// //   //     return [
// //   //       Meteor.subscribe('current-team')
// //   //     ]
// //   //   }


// //   // });



  

//   // edit team
//   this.route('TeamEdit', {
//     path: '/teams/edit/:_id',
//     data: function() {
//       return Teams.find(this.params._id);
//     }
//   });





//   // /*----------  Starter Lineup Page  ----------*/

//   // // drag drop to choose starters
//   // this.route('StarterList', {
//   //   path: 'team/game/:_id/starters/',
//   //   data: function() {
//   //     return Games.find(this.params._id);
//   //   }
//   // });

//   // /*----------  Subs  ----------*/

//   // // subs page
//   // this.route('SubList', {
//   //   path: '/teams/games/subs/'
//   // });





// // // var requireLogin = function(pause) {
// // //   if (!Meteor.user()) {
// // //     this.render('AccessDenied');
// // //   }
// // // };
// // // Router.onBeforeAction('loading');

// // // Router.onBeforeAction(requireLogin, {
// // //   only: ['GameEdit', 'GameNew', 'PositionEdit', 'PositionNew',
// // //     'FormationNew', 'TeamEdit', 'TeamNew'
// // //   ]
// // // });
