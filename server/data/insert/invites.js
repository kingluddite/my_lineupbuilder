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
  },
  sendInvite: function ( invitee, url ) {
    var token;
    check( invitee, {
      id: String,
      email: String
    } );
    check( url, String );
    token = Random.hexString( 10 );
    return Invites.update( invitee.id, {
      $set: {
        token: token,
        dateInvited: ( new Date() )
          .getTime(),
        invited: true,
        accountCreated: false
      }
    }, function ( error ) {
      if ( error ) {
        return console.log( error );
      } else {
        return Email.send( {
          to: invitee.email,
          from: "Soccermatters <phil@soccermatters.com>",
          subject: "Welcome to Soccermatters",
          html: Handlebars.templates[ 'send-invite' ]( {
            token: token,
            url: url,
            urlWithToken: url + ( "/" + token )
          })
        });
      }
    });
  }
});
