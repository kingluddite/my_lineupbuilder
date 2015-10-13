/*
  Invites
  Collection of methods for updating documents in the Invites collection.
 */
Meteor.methods({
  sendInvite: function(invitee, url) {
    var token;
    check(invitee, {
      id: String,
      email: String
    });
    check(url, String);
    token = Random.hexString(10);
    return Invites.update(invitee.id, {
      $set: {
        token: token,
        dateInvited: (new Date()).getTime(),
        invited: true,
        accountCreated: false
      }
    }, function(error) {
      if (error) {
        return console.log(error);
      } else {
        return Email.send({
          to: invitee.email,
          from: "Soccermatters <phil@soccermatters.com>",
          subject: "Welcome to Soccermatters",
          html: Handlebars.templates['send-invite']({
            token: token,
            url: url,
            urlWithToken: url + ("/" + token)
          })
        });
      }
    });
  }
});