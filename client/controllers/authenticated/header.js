/*
  Controller: Header
  Template: /client/includes/_header.html
 */
Template.Header.created = function() {};

Template.Header.rendered = function() {};

Template.Header.helpers({
  example: function() {}
});

Template.Header.events({
  'click .logout': function(e, t) {
    return Meteor.logout(function(error) {
      if (error) {
        return alert(error.reason);
      }
    });
  }
});
