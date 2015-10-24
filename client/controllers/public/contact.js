Template.Contact.helpers({
  sContactFormSent: function(evt, template) {
    return Session.get('sContactFormSent');
  }
});
Template.Contact.events({
  'submit #email-form': function(evt, template) {
    var subject,
        body;

    evt.preventDefault();
    subject = template.find('#inputSubject').value;
    body = template.find('#inputComments').value;
    
    Meteor.call('sendEmail', subject, body, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }

      Session.set('sContactFormSent', true);
    })
  }
});
