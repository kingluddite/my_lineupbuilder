Meteor.startup(function() {
createServiceConfiguration = function(service, clientId, secret) {
  var config;
  
  // to “reset” any existing configurations in our app. Because this will all run on startup, we want to ensure that we’re clearing out any old configurations. This is nice for when you’re running a production application and reset your API keys. Having this ensures that when you update those keys in your code, they actually “stick.”
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

createServiceConfiguration('facebook', 'Meteor.settings.private.fbappid', 'Meteor.settings.private.fbsecret');
createServiceConfiguration('google', '506132420307-52ho56h58mk7kvkvb29sm6b82m26g4u9.apps.googleusercontent.com', 'pBe1cGgMh8vkreuIAeHW48uI');
createServiceConfiguration('twitter', Meteor.settings.private.twitconsumerkey, Meteor.settings.private.twitsecret);
});
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
    roles: ['coach']
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


