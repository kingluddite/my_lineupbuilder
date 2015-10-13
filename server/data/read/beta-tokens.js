Meteor.methods({
  validateBetaToken: function(user) {
    var id, testInvite;
    // check out data!
    check(user, {
      email: String,
      password: String,
      betaToken: String
    });
    // make sure our email and token exist
    testInvite = Invites.findOne({
      email: user.email,
      token: user.betaToken
    }, {
      // we only want these fields
      fields: {
        "_id": 1,
        "email": 1,
        "token": 1
      }
    });
    // bad match
    if (!testInvite) {
      throw new Meteor.Error("bad-match", "This token doesn't match your email. Please try again.");
    } else {
      // we're good, create a user and store their id
      id = Accounts.createUser({
        email: user.email,
        password: user.password
      });
      // set the role to tester
      Roles.addUsersToRoles(id, ['tester']);
      update the record using our id
      return Invites.update(testInvite._id, {
        $set: {
          // set the accountCreated to true
          accountCreated: true
        },
        // we don't need the token anymore, so we remove it
        $unset: {
          token: ""
        }
      });
    }
  }
});
