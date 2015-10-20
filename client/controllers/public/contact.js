Template.Contact.helpers({
  sContactFormSent: function(evt, template) {
    return Session.get('sContactFormSent');
  }
});
Template.Contact.events({
  'submit #emailForm': function(evt, template) {
    evt.preventDefault();
    var subject = template.find('#inputSubject').value;
    var body = template.find('#inputComments').value;
    Meteor.call('sendEmail', subject, body, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }

      Session.set('sContactFormSent', true);
    })
  }
});
