Meteor.startup(function() {

  /*
    Define environment variables.
   */
  var checkUser, i, id, len, results, user, users;

// process.env.MAIL_URL = 'smtp://' + Meteor.settings.private.mailgunurl;
// Accounts.emailTemplates.from = 'no-reply@soccermatters.com';
// Accounts.emailTemplates.siteName = 'Soccermatters';

  /*
    Generate Test Accounts
    Creates a collection of test accounts automatically on startup.
   */
  users = [{
    name: "Steve Austin",
    email: "steve@austin.com",
    password: "password",
    roles: ['admin']
  }, {
    name: "Andy Admin",
    email: "admin@admin.com",
    password: "password",
    roles: ['admin']
  }, {
    name: "Beatrix Beta",
    email: "beatrix@beta.com",
    password: "password",
    roles: ['tester']
  }];
  results = [];
  for (i = 0, len = users.length; i < len; i++) {
    user = users[i];
    checkUser = Meteor.users.findOne({
      "emails.address": user.email
    });
    if (!checkUser) {
      id = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: {
          name: user.name
        }
      });
      if (user.roles.length > 0) {
        results.push(Roles.addUsersToRoles(id, user.roles));
      } else {
        results.push(void 0);
      }
    } else {
      results.push(void 0);
    }
  }
  return results;
});
