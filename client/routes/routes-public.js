Router.route('Index', {
  path: '/',
  template: 'Index',
  onBeforeAction: function() {
    Session.set('currentRoute', 'index');
    return this.next();
  }
});

Router.route('Signup', {
  path: '/signup',
  template: 'Signup',
  onBeforeAction: function() {
    Session.set('currentRoute', 'signup');
    Session.set('betaToken', '');
    return this.next();
  }
});

Router.route('signup/:token', {
  path: '/signup/:token',
  template: 'Signup',
  onBeforeAction: function() {
    Session.set('currentRoute', 'signup');
    Session.set('betaToken', this.params.token);
    return this.next();
  }
});

Router.route('Login', {
  path: '/login',
  template: 'Login',
  onBeforeAction: function() {
    Session.set('currentRoute', 'login');
    return this.next();
  }
});

Router.route('RecoverPassword', {
  path: '/recover-password',
  template: 'RecoverPassword',
  onBeforeAction: function() {
    Session.set('currentRoute', 'recover-password');
    return this.next();
  }
});

Router.route('ResetPassword', {
  path: '/reset-password/:token',
  template: 'ResetPassword',
  onBeforeAction: function() {
    Session.set('currentRoute', 'reset-password');
    Session.set('resetPasswordToken', this.params.token);
    return this.next();
  }
});
