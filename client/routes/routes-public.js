Router.map(function() {
  this.route('Index', {
    path: '/',
    template: 'Index',
    onBeforeAction: function() {
      Session.set('currentRoute', 'index');
      return this.next();
    }
  });
  this.route('Signup', {
    path: '/signup',
    template: 'Signup',
    onBeforeAction: function() {
      Session.set('currentRoute', 'signup');
      Session.set('betaToken', '');
      return this.next();
    }
  });

  this.route('signup/:token', {
    path: '/signup/:token',
    template: 'Signup',
    onBeforeAction: function() {
      Session.set('currentRoute', 'signup');
      Session.set('betaToken', this.params.token);
      return this.next();
    }
  });

  this.route('Login', {
    path: '/login',
    template: 'Login',
    onBeforeAction: function() {
      Session.set('currentRoute', 'login');
      return this.next();
    }
  });

  this.route('RecoverPassword', {
    path: '/recover-password',
    template: 'RecoverPassword',
    onBeforeAction: function() {
      Session.set('currentRoute', 'recover-password');
      return this.next();
    }
  });

  this.route('ResetPassword', {
    path: '/reset-password/:token',
    template: 'ResetPassword',
    onBeforeAction: function() {
      Session.set('currentRoute', 'reset-password');
      Session.set('resetPasswordToken', this.params.token);
      return this.next();
    }
  });

  /*====================================
   =            Contact Form            =
   ====================================*/
  this.route('Contact', {
    path: '/contact'
  });
});
