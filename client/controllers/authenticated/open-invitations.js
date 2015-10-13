/*
/*
  Invites
  Collection of methods for inserting documents into the Invites collection.
 */
/* these are open invitations: invitations that have been requested
*   but not sent/approved
*/
Template.OpenInvitations.helpers({
  hasInvites: function() {
    var getInvites;
    // grab all invites that have a false value
    getInvites = Invites.find({
      invited: false
    }, {
      // we only want these 2 fields
      fields: {
        "_id": 1,
        "invited": 1
      }
    }).count(); // what's the count?
    // as long as we have a number greater than zero, return true
    if (getInvites > 0) {
      return true;
    } else {
      // not > 0? - return false
      return false;
    }
  },
  invites: function() {
    // grab all the invites with false invited value
    return Invites.find({
      invited: false
    }, {
      // sort by requested
      sort: {
        "requested": 1
      }
    }, {
      // we want these field values returned
      fields: {
        "_id": 1,
        "inviteNumber": 1,
        "requested": 1,
        "email": 1,
        "invited": 1
      }
    });
  }
});

Template.OpenInvitations.events({
  'click .send-invite': function() {
    // when someone clicks the invite button
    var confirmInvite, invitee, url;
    // grabe the id and email of who you are inviting
    // notice not using input value but grabbing needed data
    // via the 'this' keyword
    // in 'this context' we are in the #each, so this represents
    // the currently looped item
    invitee = {
      id: this._id,
      email: this.email
    };
    // window.location.origin = base url of where this script is
    //  running from
    // we do this because we want the user to be able to click a
    //  button in their email that links directly to the signup
    //  form
    //  so whether it's http://localhost:3000 or http://iamcool.com
    //   it will still work (we avoid harding urls and it saves us
      // time down the road - especially if we forget to change them
      // everywhere they are used when we change one
    url = window.location.origin + "/signup";
    // make sure we are sure about this
    confirmInvite = confirm("Are you sure you want to invite " + this.email + "?");
    if (confirmInvite) {
      // yes? then call server method and pass invitee and url
      return Meteor.call('sendInvite', invitee, url, function(error) {
        if (error) {
          return console.log(error);
        } else {
          return alert("Invite sent to " + invitee.email + "!");
        }
      });
    }
  }
});
