Template.GameShow.created = function() {
  this.editGameTime = new ReactiveVar(false);
};

Template.GameShow.rendered = function() {
  $("[data-toggle=tooltip]").tooltip();
  $('.instructions').hide();
  // adding a date field renders the proper date in this field
  //  when page loads, without it, the wrong date populates
  $('.date-time-picker').datetimepicker();
}

Template.GameShow.helpers({
  sTeamId: function() {
    return Session.get('sTeamId');
  },
  rvEditGameTime: function() {
    return Template.instance().editGameTime.get();
  },
  // if there is a team return false
  // so we can hide the add team form
  cGame: function() {
    if (Meteor.user()) {

      var myPosition = Games.findOne({
        _id: Session.get('sGameId')
      });
      var currPosInfo = myPosition.playerGameInfo[0];
      return currPosInfo;
    }
    // this is how you get to the data you want
    // console.log(myPosition.playerGameInfo[0].player02.fieldPosition);
  },

  cTeam: function() {
    return Teams.findOne({
      _id: Session.get('sTeamId')
    });
  },

  cGames: function() {
    if (Meteor.user()) {

      return Games.findOne({
        _id: Session.get('sGameId')
      });
      // var currPosInfo = myPosition.playerGameInfo[0];
      // return currPosInfo;

    }
    // this is how you get to the data you want
    // console.log(myPosition.playerGameInfo[0].player02.fieldPosition);
  },

  sGameId: function() {
    return Session.get('sGameId');
  },
  sEditGameTime: function() {
    return Session.get('sEditGameTime');
  }
});

Template.GameShow.events({
  'click .help-text': function(evt, tmpl) {
    $('.instructions').toggle(400);
    return false;
  },
  // edit date/time show input field
  'click .edit-game-time': function(evt, template) {
    var editGameTime = template.editGameTime.get();
    template.editGameTime.set(!editGameTime);
  },
  'click .date-time-picker': function(evt, template) {
    $('.date-time-picker').datetimepicker();
  },
  'click .cancel-edit': function(evt, template) {
    var editGameTime = template.editGameTime.get();
    template.editGameTime.set(!editGameTime);
  },
  // update date time and submit form to update game collection
  'submit form#updateGameTime': function(evt, template) {
    // turn off default form behavior
    evt.preventDefault();

    // what game are we dealing with?
    var currentGameId = Session.get('sGameId');
    // convert the string date to an ISO String
    // which is required by moment
    var frmDateTime = $(evt.target).find('[name=gameDateTime]').val();
    var convertedDate = new Date(frmDateTime);

    // store game time info in an object 
    var gameTimeProperties = {
      gameDateTime: convertedDate
    };

    // update the games collection with the new time
    Games.update(currentGameId, {
      $set: gameTimeProperties
    }, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
    });

    // reactive var to set date/time after update
    var editGameTime = template.editGameTime.get();
    template.editGameTime.set(!editGameTime);
  },


});
