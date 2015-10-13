/*
 *  Controller: Add Team
 *  Template: /client/views/authenticated/add-team.html
 */

/*
 * Rendered
 */

Template.addTeam.onRendered(function() {
  $("#add-team").validate({
    rules: {
      title: {
        required: true,
        postExists: true
      },
      slug: {
        required: true,
        postExists: true
      },
      content: {
        required: true
      }
    },
    messages: {
      title: {
        required: "Don't forget to add a team name",
        postExists: "Hmm, it looks like a team with that name already exists!"
      },
      slug: {
        required: "A slug is required"
      },
      content: {
        required: "That's not much of a post!"
      }
    },
    submitHandler: function() {
      // If all is well, let's go ahead and insert our post. We'll start by
      // getting the values from our form.
      var form = $("#add-team");
      var team = {
        title: form.find("[name='title']").val(),
        slug: form.find("[name='slug']").val(),
        content: form.find("[name='content']").val(),
        author: form.find("[name='author']").val()
      }

      // Next, we'll call to our insert post method on the server.
      Meteor.call('insertTeam', team, function(error, response) {
        if (error) {
          Bert.alert(error.reason, "danger");
        } else {
          // If all is well, let our user know and redirect them to the new post.
          // Here we make use of Iron Router's named routes so that we can pass our
          // new slug in an options argument instead of embedding it in a string
          // like Router.go("/posts/" + post.slug); This keeps our route a little
          // more resilient so if we change our single post path, the redirect
          // still works (e.g., instead of /posts we change it to /post).
          Bert.alert("Great! Your team was added to the site.", "success");
          Router.go("team.show", {
            slug: team.slug
          });
        }
      });
    }
  });
});

/*
 * Helpers
 */

Template.addTeam.helpers({
  currentUrl: function() {
    // Just for fun, we can get the current origin URL to display alongside
    // our slug field for better context.
    var currentUrl = window.location.origin;
    return currentUrl;
  }
});

/*
 * Events
 */

Template.addTeam.events({
  'submit form': function(e) {
    e.preventDefault();
  },
  'blur [name="title"]': function() {
    // Cache our form and fields in variables.
    var form = $("#add-post"),
      title = form.find("[name='title']"),
      slug = form.find("[name='slug']");
    // When we blur, see if our post title is valid.
    var isValid = title.valid();
    // If our post title is valid, update our slug field.
    if (isValid) {
      var formatted = formatSlug(title.val())
      slug.val(formatted);
    } else {
      slug.val("");
    }
  }
});
