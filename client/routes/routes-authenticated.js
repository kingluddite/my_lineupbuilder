/*
* Routes: Authenticated
* Routes that are only visible to authenticated users.
*/

Router.route('addTeam', {
  path: '/teams/add',
  template: 'addTeam',
  subscriptions: function() {
    return Meteor.subscribe('teams');
  },
  onBeforeAction: function(){
    Session.set('currentRoute', 'add-team');
    Session.set('isSingleTeam', false);
    this.next();
  }
});
