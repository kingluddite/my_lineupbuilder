Meteor.methods({
  exampleRemoveMethod: function(argument){
    // Check the argument. Assuming a String type here.
    check(argument, String);

    // Perform the remove.
    try {
      var exampleId = Example.remove(argument);
      return exampleId;
    } catch(exception) {
      // If an error occurs, return it to the client.
      return exception;
    }
  }
});
