Meteor.methods({
  'sendEmail': function(subject, comments) {
    this.unblock();

    Email.send({
      to: Meteor.settings.private.myemail,
      from: 'no-reply@mysoccerlineupbuilder.meteor.com',
      subject: subject,
      text: comments
    })
  }
});
