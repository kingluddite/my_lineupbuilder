Meteor.methods({
  initApiKey: function( userId ) {
    check(
      // verify that our userId is equal to the currently logged in user
      userId,
      Match.OneOf( Meteor.userId(), String )
    );

    // generate random key 32 characters in length
    var newKey = Random.hexString( 32 );

    try {
       var key = APIKeys.insert({
        "owner": userId,
        "key": newKey
       });
       return key;
    } catch( exception ) {
      return exception;
    }
  }
});
