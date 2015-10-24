Template.GameShow.created = function() {
  this.editGameTime = new ReactiveVar(false);
};

Template.GameShow.rendered = function() {
  $("[data-toggle=tooltip]").tooltip();
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
      var myPosition,
          currPosInfo;

      myPosition = Games.findOne({
        _id: Session.get('sGameId')
      });
      currPosInfo = myPosition.playerGameInfo[0];
      return currPosInfo;
    }
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
    }
  },

  sGameId: function() {
    return Session.get('sGameId');
  },
  sEditGameTime: function() {
    return Session.get('sEditGameTime');
  }
});

Template.GameShow.events({
  // edit date/time show input field
  'click .edit-game-time': function(evt, template) {
    var editGameTime;

    editGameTime = template.editGameTime.get();
    template.editGameTime.set(!editGameTime);
  },
  'click .date-time-picker': function(evt, template) {
    $('.date-time-picker').datetimepicker();
  },
  'click .cancel-edit': function(evt, template) {
    var editGameTime;

    editGameTime = template.editGameTime.get();
    template.editGameTime.set(!editGameTime);
  },
  // update date time and submit form to update game collection
  'submit form#update-game-time': function(evt, template) {
    var currentGameId,
        frmDateTime,
        convertedDate,
        gameTimeProperties,
        editGameTime;

    // turn off default form behavior
    evt.preventDefault();

    // what game are we dealing with?
    currentGameId = Session.get('sGameId');
    // convert the string date to an ISO String
    // which is required by moment
    frmDateTime = $(evt.target).find('[name=gameDateTime]').val();
    convertedDate = new Date(frmDateTime);

    // store game time info in an object 
    gameTimeProperties = {
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
    editGameTime = template.editGameTime.get();
    template.editGameTime.set(!editGameTime);
  },
});


