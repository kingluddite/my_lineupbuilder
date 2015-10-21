/*
  Route Filters
  Filters for managing user access to application routes.
 */

/*
  Filter: Check if a User is Logged In
  If a user is not logged in and attempts to go to an authenticated route,
  re-route them to the index/beta signup screen.
 */
var checkUserLoggedIn, 
    userAuthenticatedAdmin, 
    userAuthenticatedBetaTester;

checkUserLoggedIn = function ( ) {
  if ( !Meteor.loggingIn( ) && !Meteor.user( ) ) {
    return Router.go( '/' );
  } else {
    return this.next( );
  }
};

/*
  Filter: Check if a Beta Tester User Exists
  If a user is logged in and attempts to go to a public route, re-route
  them to the main dashboard screen.
 */

userAuthenticatedBetaTester = function ( ) {
  var isBetaTester, loggedInUser;
  loggedInUser = Meteor.user( );
  isBetaTester = Roles.userIsInRole( loggedInUser, [ 'tester' ] );
  if ( !Meteor.loggingIn( ) && isBetaTester ) {
    return Router.go( '/dashboard' );
  } else {
    return this.next( );
  }
};

/*
  Filter: Check if an Admin User Exists
  If a user is logged in and attempts to go to a public route, re-route
  them to the main invites screen.
 */

userAuthenticatedAdmin = function ( ) {
  var isAdmin, loggedInUser;
  loggedInUser = Meteor.user( );
  isAdmin      = Roles.userIsInRole( loggedInUser, [ 'admin' ] );
  if ( !Meteor.loggingIn( ) && isAdmin ) {
    return Router.go( '/invites' );
  } else {
    return this.next( );
  }
};

Router.onBeforeAction( checkUserLoggedIn, {
  except: [
    'Index',
    'Contact',
    'Signup',
    'Signup/:token',
    'Login',
    'Recover-password',
    'Reset-password'
  ]
} );


Router.onBeforeAction( userAuthenticatedBetaTester, {
  only: [ 
    'Index', 
    'Signup', 
    'Signup/:token', 
    'Login', 
    'Recover-password', 
    'Reset-password', 
    'Invites' 
  ]
} );

Router.onBeforeAction( userAuthenticatedAdmin, {
  only: [ 
    'Index', 
    'Signup', 
    'Signup/:token', 
    'Login', 
    'Recover-password', 
    'Reset-password'
  ]
} );
