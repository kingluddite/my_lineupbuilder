Template.PlayerNew.helpers({
  sRosterComplete: function() {
    return Session.get('sRosterComplete');
  },

  // you need the sTeamId to insert it into the player collection
  sTeamId: function() {
    return Session.get('sTeamId');
  },

  sGameId: function() {
    return Session.get('sGameId');
  },

  // show add player box if roster max is not reached
  maxPlayers: function() {
    if (Meteor.user()) {
      var currentRosterCount;

      // what's the current count of our team's roster?
      currentRosterCount = Players.find({
        teamId: Session.get('sTeamId')
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
    var currentRosterCount;

    currentRosterCount = Players.find({
      teamId: Session.get('sTeamId')
    }).count();
    return currentRosterCount + 1;
  }
});


Template.PlayerNew.events({
  'click .new-player': function(evt, template) {
    var currentRosterCount,
        myForm,
        myFormInputsCount,
        totalRosterCount,
        newDiv;

    evt.preventDefault();
    // find out the current roster number
    currentRosterCount = Players.find({
      teamId: Session.get('sTeamId')
    }).count();

    // grab the roster form
    myForm = document.getElementById('team-roster-form');
    // grab just the inputs from that form
    myFormInputsCount = myForm.getElementsByTagName('input').length;
    // add the number of players the coach wants to add
    //   and add that to the current roster count
    totalRosterCount = currentRosterCount + myFormInputsCount;
    // if the total roster count is exceeded, alert the coach
    if (totalRosterCount >= 26) {
      // diable the add player button if 26 players are on roster
      $('.new-player').attr('disabled', 'disabled');
      // show the alert box
      $('#new-player-status').css('display', 'block');
      // populate the box with a UI message
      $('#new-player-status').text('You have reached the limit of adding players');
    } else {
      // remove the status text
      $('#new-player-status').empty();
      // make the add player button clickable again
      $('.new-player').removeAttr('disabled');
      // we need to make a new div
      newDiv = document.createElement('div');
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

  // set roster complete session to false so you can edit roster
  'click .edit-roster': function(evt, template) {
    Session.setPersistent("sRosterComplete", false);
  },

  // when people add player boxes give them the option
  //  to remove them
  'click .remove-box': function(evt, template) {
    var elem,
        currentRosterCount,
        myForm,
        myFormInputs,
        myFormInputsCount,
        curRosterPlusOne,
        i,
        totalRosterCount;

    evt.preventDefault();

    elem = document.querySelector('.player-box');
    elem.remove();

    // find out the current roster number
    currentRosterCount = Players.find({
      teamId: Session.get('sTeamId')
    }).count();

    // grab the roster form
    myForm = document.getElementById('team-roster-form');
    // grab just the inputs
    myFormInputs = myForm.getElementsByTagName('input');
    // grab just the inputs from that form and find their lenght
    myFormInputsCount = myForm.getElementsByTagName('input').length;
    // loop through the inputs and update their placeholder value
    curRosterPlusOne = currentRosterCount + 1;
    for (i = 0; i < myFormInputsCount; i++) {
      myFormInputs[i].setAttribute('placeholder', 'Player ' +
        (curRosterPlusOne++));
    }
    // add the number of players the coach wants to add
    //   and add that to the current roster count
    totalRosterCount = currentRosterCount + myFormInputsCount;

    // if the total roster count is exceeded, alert the coach
    if (totalRosterCount < 26) {
      // remove the UI add player status message
      $('#new-player-status').css('display', 'none');
      // empty the UI player status message
      $('#new-player-status').empty();
      // make the add player clickable again
      $('.new-player').removeAttr('disabled');
    }
  },

  'submit form#team-roster-form': function(evt, template) {
    var playerCount,
        myForm,
        myFormInputs,
        i,
        player,
        elem;

    evt.preventDefault();

    // we find the count of the Players roster for this team
    playerCount = Players.find({
      teamId: Session.get('sTeamId')
    }).count();

    if (playerCount <= 26) {
      $('.team-roster').show();
    } else {
      $('.team-roster').hide();
    }

    myForm       = document.getElementById('team-roster-form');
    myFormInputs = myForm.getElementsByTagName('input');

    //Extract Each Element Value
    for (i = 0; i < myFormInputs.length; i++) {

      player = {
        teamId:   Session.get('sTeamId'),
        fullName: myFormInputs[i].value
      };

      Meteor.call('newPlayer', player, function(error, id) {
        if (error) {
          return alert(error.reason);
        }
        Session.setPersistent('sRosterCreated', true);
        
        if (document.querySelector('.player-box')) {
          elem = document.querySelector('.player-box');
          elem.remove();
        }
      });
      // client side alert
      Bert.alert('Players Added', 'success', 'growl-top-right');
      // clear all form inputs
      myFormInputs[i].value = '';

    }
  }
});
