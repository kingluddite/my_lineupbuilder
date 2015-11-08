Meteor.methods({
  regenerateApiKey: function( userId ){
    check( userId, Meteor.userId() );

    var newKey = Random.hexString( 32 );

    try {
      // we first want to look up the key in the database by the user’s ID and then set the key
      var keyId = APIKeys.update( { "owner": userId }, {
        $set: {
          "key": newKey
        }
      });
      return keyId;
    } catch(exception) {
      return exception;
    }
  }
});
