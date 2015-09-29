var createServiceConfiguration;

createServiceConfiguration = function(service, clientId, secret) {
  var config;
  ServiceConfiguration.configurations.remove({
    service: service
  });
  config = {
    generic: {
      service: service,
      clientId: clientId,
      secret: secret
    },
    facebook: {
      service: service,
      appId: clientId,
      secret: secret
    },
    twitter: {
      service: service,
      consumerKey: clientId,
      secret: secret
    }
  };
  switch (service) {
    case 'facebook':
      return ServiceConfiguration.configurations.insert(config.facebook);
    case 'twitter':
      return ServiceConfiguration.configurations.insert(config.twitter);
    default:
      return ServiceConfiguration.configurations.insert(config.generic);
  }
};

createServiceConfiguration('facebook', 'Meteor.settings.private.fbappid', 'Meteor.settings.private.fbsecret')
createServiceConfiguration('github', 'Meteor.settings.private.ghclientid', 'Insert Meteor.settings.private.ghsecret')
createServiceConfiguration('google', 'Meteor.settings.private.googlecid', 'Meteor.settings.private.googlesecret')
createServiceConfiguration('twitter', 'Meteor.settings.private.twitconsumerkey', 'Meteor.settings.private.twitsecret')

Meteor.startup(function() {

  /*
    Define environment variables.
   */
  var checkUser, i, id, len, results, user, users;

  process.env.MAIL_URL = 'smtp://postmaster@sandboxcae008ae47c34078926740dcf3046605.mailgun.org:494l9rso5u63@smtp.mailgun.org:587';

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
