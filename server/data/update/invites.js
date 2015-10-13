/*
  Invites
  Collection of methods for updating documents in the Invites collection.
 */
Meteor.methods({
  sendInvite: function(invitee, url) {
    var token;
    // check our data!
    // 2 checks for 2 separate items
    //  invite has id and email and url has url :)
    check(invitee, {
      id: String,
      email: String
    });
    check(url, String);
    // create a random 10 character token using random package
    // completely random, 10 character hexadecimal string
    //  (letters and numbers)
    //  will be used as our beta token to uniquely id beta
    //  testers
    token = Random.hexString(10);
    // we update a specific record using the id
    return Invites.update(invitee.id, {
      $set: {
        // set our random token
        token: token,
        // get milliseconds date
        dateInvited: (new Date()).getTime(),
        // we've invited them so they are now invited (true)
        invited: true,
        // but remember, the account has not been created yet!
        // we now can check who actually joined after being invited
        accountCreated: false
      }
    }, function(error) {
      if (error) {
        return console.log(error);
      } else {
        // invite collection updated, now we send invitee an email
        // using the email package
        return Email.send({
          to: invitee.email,
          from: "Soccermatters <phil@soccermatters.com>",
          subject: "Welcome to Soccermatters",
          // using handlebars-server package
          // gives us the ability to render templates on the server
          //   find a handlebars template called 'send-invite.handlebars'
          //    second part, passes an aobject with data to set
          //    in the template
          //    so with each key/value pair we can access them in our
          //    email template
          html: Handlebars.templates['send-invite']({
            token: token,
            url: url,
            // becomes {{urlWithToken}} in our template
            // NOTE: these special templates must reside inside
            // your server folder
            // our path: /server/email/templates/send-invite.handlebars
            urlWithToken: url + ("/" + token)
          })
        });
      }
    });
  }
});
