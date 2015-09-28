// Accounts.ui.config({
//   passwordSignupFields: 'USERNAME_ONLY'
// });


// allows you to easily format JavaScript dates
UI.registerHelper('formatDate', function(datetime) {
  if (moment) {
    return moment(datetime).format('MMMM Do YYYY');
  } else {
    return datetime;
  }
});

UI.registerHelper('formatTime', function(datetime) {
  if (moment) {
    return moment(datetime).format('h:mm a');
  } else {
    return datetime;
  }
});
