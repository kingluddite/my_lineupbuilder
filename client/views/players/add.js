// need to set the max number for a roster
var limit = 26;

Template.tAddPlayer.helpers({
  rosterCompleted: function() {
    return Session.get('sRosterComplete');
  },

  // show add player box if roster max is not reached
  maxPlayers: function() {
    if (Meteor.user()) {
      var currentRosterCount = Players.find({
        createdBy: Meteor.user()._id
      }).count();

      if (currentRosterCount >= 26) {
        return false;
      } else {
        return true;
      }
    }
  },
  // for first add player form need to add one to roster count
  rosterCountPlusOne: function() {
    var currentRosterCount = Players.find({
      createdBy: Meteor.user()._id
    }).count();
    return currentRosterCount + 1;
  }
});


Template.tAddPlayer.events({
  'click .add-player': function(evt, tmpl) {
    evt.preventDefault();
    // find out the current roster number
    var currentRosterCount = Players.find({
      createdBy: Meteor.user()._id
    }).count();

    // grab the roster form
    var myForm = document.getElementById("teamRosterForm");
    // grab just the inputs from that form
    myFormInputsCount = myForm.getElementsByTagName("input").length;
    // add the number of players the coach wants to add
    //   and add that to the current roster count
    var totalRosterCount = currentRosterCount + myFormInputsCount;
    // if the total roster count is exceeded, alert the coach
    if (totalRosterCount >= 26) {
      // diable the add player button if 26 players are on roster
      $('.add-player').attr('disabled', 'disabled');
      // show the alert box
      $('#addPlayerStatus').css('display', 'block');
      // populate the box with a UI message
      $('#addPlayerStatus').text('You have reached the limit of adding players');
    } else {
      // remove the status text
      $('#addPlayerStatus').empty();
      // make the add player button clickable again
      $('.add-player').removeAttr('disabled');
      // we need to make a new div
      var newDiv = document.createElement('div');
      // give it a class name so we can grab it later when
      //  we want to remove it
      newDiv.className = 'player-box';
      // stick a new nicely formatted text field inside it
      newDiv.innerHTML = '<div class="form-group">' +
        '<label class="sr-only">Player ' + (totalRosterCount + 1) + '</label>' +
        '<div class="input-group">' +
        '<input type="text" required class="form-control" ' +
        'placeholder=' + '"Player ' + (totalRosterCount + 1) + '"' + 'name="players[]">' +
        '<div class="input-group-addon">' +
        '<button type="button" class="close remove-box" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span></button>' +
        '</div>' +
        '</div>' +
        '</div>';
      // add the text field to the Dom roster element
      document.querySelector('.team-roster').appendChild(newDiv);
    }
  },

  // when people add player boxes give them the option
  //  to remove them
  'click .remove-box': function(evt, tmpl) {
    evt.preventDefault();

    var elem = document.querySelector('.player-box');
    elem.remove();

    // find out the current roster number
    var currentRosterCount = Players.find({
      createdBy: Meteor.user()._id
    }).count();

    // grab the roster form
    var myForm = document.getElementById("teamRosterForm");
    // grab just the inputs
    var myFormInputs = myForm.getElementsByTagName("input");
    // grab just the inputs from that form and find their lenght
    var myFormInputsCount = myForm.getElementsByTagName("input").length;
    // loop through the inputs and update their placeholder value
    var curRosterPlusOne = currentRosterCount + 1;
    for (var i = 0; i < myFormInputsCount; i++) {
      myFormInputs[i].setAttribute('placeholder', 'Player ' +
        (curRosterPlusOne++));
    }
    // add the number of players the coach wants to add
    //   and add that to the current roster count
    var totalRosterCount = currentRosterCount + myFormInputsCount;

    // if the total roster count is exceeded, alert the coach
    if (totalRosterCount < 26) {
      // remove the UI add player status message
      $('#addPlayerStatus').css('display', 'none');
      // empty the UI player status message
      $('#addPlayerStatus').empty();
      // make the add player clickable again
      $('.add-player').removeAttr('disabled');
    }
  },

  'submit form#teamRosterForm': function(evt) {
    evt.preventDefault();
    var playerCount = Players.find().count();
    if (playerCount <= 26) {
      $("#teamRoster").show();
    } else {
      $("#teamRoster").hide();
    }
    var myForm = document.getElementById("teamRosterForm");
    myFormInputs = myForm.getElementsByTagName("input");
    //Extract Each Element Value
    for (var i = 0; i < myFormInputs.length; i++) {

      Meteor.call('addPlayer', myFormInputs[i].value, function(error, id) {
        if (error) {
          return alert(error.reason);
        }
        var elem = document.querySelector('.player-box');
        elem.remove();
      });
      myFormInputs[i].value = "";

    }
  }
});