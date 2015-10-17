/*==========================================
=            Controller: Header            =
==========================================*/
// Template:  /client/includes/_header.html

Template.header.events({
  'click .logout': function(evt, template) {
    return Meteor.logout(function(error) {
      if (error) {
        return alert(error.reason);
      }
    });
  }
});
