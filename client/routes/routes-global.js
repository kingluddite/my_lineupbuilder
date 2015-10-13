Router.configure({
  layoutTemplate: 'layoutDefault',
  loadingTemplate: 'loading',
  notFoundTemplate: 'NotFound'
  // waitOn: function() {
  //   return [
  //     // Meteor.subscribe('current-team-roster'),
  //     // Meteor.subscribe('current-game'),
  //     Meteor.subscribe('teams')
  //     //     //     Meteor.subscribe('current-league'),
  //     //     //     Meteor.subscribe('current-season'),
  //     //     //     Meteor.subscribe('map-markers')
  //   ];
  // }


});
