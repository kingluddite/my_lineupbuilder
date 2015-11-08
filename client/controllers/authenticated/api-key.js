Template.apiKey.onCreated(function(){
  this.subscribe( "APIKey" );
});

Template.apiKey.events({
  'click .regenerate-api-key': function( ){
     var userId              = Meteor.userId(),
         confirmRegeneration = bootbox.confirm( "Are you sure? This will invalidate your current key!" );

     if ( confirmRegeneration ) {
       Meteor.call( "regenerateApiKey", userId, function( error, response ) {
         if ( error ) {
           Bert.alert( error.reason, "danger" );
         } else {
           Bert.alert( "All done! You have a new API key.", "success" );
         }
       });
     }
  }
});
