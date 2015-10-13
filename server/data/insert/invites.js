/*
  Invites
  Collection of methods for updating documents in the Invites collection.
 */
Meteor.methods( {
  addToInvitesList: function ( invitee ) {
    var emailExists, inviteCount;
    // data check, make sure it's what we want
    check( invitee, {
      email: String,
      requested: Number,
      invited: Boolean
    });
    // grab the email and check if it exists in our collection
    emailExists = Invites.findOne( {
      "email": invitee.email
    });
    // if email exists, throw an error and let the user know
    //  by sending the error back to the client
    if ( emailExists ) {
      throw new Meteor.Error( "email-exists", "It looks like you've already signed up for our beta. Thanks!" );
    } else {
      // no error? cool, find out our invite count
      inviteCount = Invites.find( {}, {
          fields: {
            "_id": 1
          }
        }).count();
      // add 1 to the invitee inviteNumber property
      invitee.inviteNumber = inviteCount + 1;
      // and then insert it into the collection
      return Invites.insert( invitee, function ( error ) {
        if ( error ) {
          return console.log( error );
        }
      });
    }
  }
});
