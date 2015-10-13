Meteor.methods({
  validateBetaToken: function(user) {
    var id, testInvite;
    check(user, {
      email: String,
      password: String,
      betaToken: String
    });
    testInvite = Invites.findOne({
      email: user.email,
      token: user.betaToken
    }, {
      fields: {
        "_id": 1,
        "email": 1,
        "token": 1
      }
    });
    if (!testInvite) {
      throw new Meteor.Error("bad-match", "This token doesn't match your email. Please try again.");
    } else {
      id = Accounts.createUser({
        email: user.email,
        password: user.password
      });
      Roles.addUsersToRoles(id, ['tester']);
      return Invites.update(testInvite._id, {
        $set: {
          accountCreated: true
        },
        $unset: {
          token: ""
        }
      });
    }
  }
});
