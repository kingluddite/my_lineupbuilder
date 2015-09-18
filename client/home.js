// need to set the max number for a roster
var limit = 26;

// when the trashcan icon is clicked, the player is deleted
var removePlayer = function() {
    Players.remove({
        _id: Session.get('sPlayerId')
    });
};

// TODO - does not work all the time buggy
Template.tHome.rendered = function() {
    // when page loads hide the player add message box
    $('#addPlayerStatus').css('display', 'none');
};

Template.tHome.helpers({
    // grab all the players and provide collection for roster template
    cPlayers: function() {
        // only if the user is logged in
        if (Meteor.user()) {
            // grab all the players the user created (so we know it's their
            //   team)

            return Players.find({
                createdBy: Meteor.user()._id
            });
        } else {
            this.ready();
        }
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

Template.tHome.events({
    'click .add-player': function(evt, tmpl) {
        evt.preventDefault();
        // find out the current roster number
        var currentRosterCount = Players.find({
            createdBy: Meteor.user()._id
        }).count();

        // grab the roster form
        var myForm = document.getElementById("teamRoster");
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
    // coach completes his roster and lets us know
    //  visually we just add a checkbox, muted text and a line-through
    'click .roster-complete': function(evt, tmpl) {
        if (Session.get("sRosterComplete")) {
            $('.roster-created').html('<span> Roster Created</span>');
            $('.roster-created span').css('text-decoration', 'none');
            $('.roster-created').removeClass('text-muted');
            Session.set("sRosterComplete", false);
        } else {
            // remove all the stuff we add to visually show the item
            // is not completed
            $('.roster-created').html('<i class="fa fa-check"></i> <span> Roster Created</span>');
            $('.roster-created span').css('text-decoration', 'line-through');
            $('.roster-created').addClass('text-muted');
            Session.set("sRosterComplete", true);
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
        var myForm = document.getElementById("teamRoster");
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

    'click .remove': function(evt, tmpl) {
        evt.preventDefault();

        var playerCount = Players.find().count();

        if (confirm("Delete this player?")) {
            Session.set('sPlayerId', this._id);
            removePlayer();
            Session.set('sPlayerId', null);
        }
        if (playerCount <= 26) {
            $("#teamRoster").show();
        }
    },

    'submit form': function(evt) {
        evt.preventDefault();
        var playerCount = Players.find().count();
        if (playerCount <= 26) {
            $("#teamRoster").show();
        } else {
            $("#teamRoster").hide();
        }
        var myForm = document.getElementById("teamRoster");
        myFormInputs = myForm.getElementsByTagName("input");
        //Extract Each Element Value
        for (var i = 0; i < myFormInputs.length; i++) {

            Meteor.call('addPlayer', myForm.elements[i].value, function(error, id) {
                if (error) {
                    return alert(error.reason);
                }
            });
            myForm.elements[i].value = "";
        }
    }
});
