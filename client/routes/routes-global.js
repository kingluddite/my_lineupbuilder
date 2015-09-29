Router.route('index', {
  path: '/index',
  template: 'Index',
  onBeforeAction: function() {
    Session.set('currentRoute', 'index');
    return this.next();
  }
});

Router.configure({
  notFoundTemplate: 'notFound',
  layoutTemplate: 'layoutDefault'
});
