Router.configure({
  layoutTemplate: 'layoutDefault',
  loadingTemplate: 'loading',
  notFoundTemplate: 'NotFound',
  waitOn: function() {
    return [
      Meteor.subscribe('userData'),
      Meteor.subscribe('current-game'),
      Meteor.subscribe('current-team'),
      Meteor.subscribe('current-team-roster')
      //     //     Meteor.subscribe('current-league'),
      //     //     Meteor.subscribe('current-season'),
      //Meteor.subscribe('map-markers')
    ];
  }
});
