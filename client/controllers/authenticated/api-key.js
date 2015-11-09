Template.apiKey.onCreated(function(){
  this.subscribe( "APIKey" );
});

Template.apiKey.helpers({
  apiKey: function() {
    // Note: because we know our publication is already returning the key for
    // the current user, and we only expect it to return 1 key, we can do
    // a findOne here without any projections. Nice!
    var apiKey = APIKeys.findOne();

    if ( apiKey ) {
      return apiKey.key;
    }
  }
});

Template.apiKey.events({
  'click .regenerate-api-key': function() {
    var userId = Meteor.userId(),
      confirmRegeneration = bootbox.confirm("Are you sure? This will invalidate your current key!",
        function(result) {
          if (result) {
            Meteor.call("regenerateApiKey", userId, function(error, response) {
              if (error) {
                Bert.alert(error.reason, "danger");
              } else {
                console.log(result);
                Bert.alert("All done! You have a new API key.", "success");
              }
            });
          } else {
            Bert.alert("API not changed", "danger");
          }

        });
  }
});

