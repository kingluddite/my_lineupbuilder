Meteor.publish( 'APIKey', function(){
  // find our current user’s API key by using this.userId value
  //  that Meteor gives us access to inside of publications
  // This way we don’t have to pass the user’s ID with our subscribe call
  var user = this.userId;
  var data = APIKeys.find( { "owner": user }, {fields: { "key": 1 } } );

  if ( data ) {
    return data;
  }

  return this.ready();
});
