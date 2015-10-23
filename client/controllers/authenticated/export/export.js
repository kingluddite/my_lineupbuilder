Template.Export.events({
  'click .export-data': function() {
    var userId, base64ToBlob;
    userId = Meteor.userId();
    return Meteor.call('exportData', userId, function(error, response) {
      if (error) {
        return console.log(error.reason);
      } else {
        // This is where we'll handle downloading our .zip file.
        base64ToBlob = function(base64String) {
          var blob, byteArray, byteCharacters, byteNumbers, i;
          byteCharacters = atob(base64String);
          byteNumbers = new Array(byteCharacters.length);
          i = 0;
          while (i < byteCharacters.length) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
            i++;
          }
          byteArray = new Uint8Array(byteNumbers);
          return blob = new Blob([byteArray], {
            type: "zip"
          });
        };

        blob = base64ToBlob(response);

        saveAs(blob, 'export.zip');
      }
    });
  }
});
