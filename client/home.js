/**
 * Get closest DOM element up the tree that contains a class, ID, or data attribute
 * @param  {Node} elem The base element
 * @param  {String} selector The class, id, data attribute, or tag to look for
 * @return {Node} Null if no match
 */
var getClosest = function(elem, selector) {

    var firstChar = selector.charAt(0);

    // Get closest match
    for (; elem && elem !== document; elem = elem.parentNode) {

        // If selector is a class
        if (firstChar === '.') {
            if (elem.classList.contains(selector.substr(1))) {
                return elem;
            }
        }

        // If selector is an ID
        if (firstChar === '#') {
            if (elem.id === selector.substr(1)) {
                return elem;
            }
        }

        // If selector is a data attribute
        if (firstChar === '[') {
            if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
                return elem;
            }
        }

        // If selector is a tag
        if (elem.tagName.toLowerCase() === selector) {
            return elem;
        }

    }

    return false;

};

Template.tHome.helpers({
    cPlayers: function() {
        // return Players.find();
        if (Meteor.user()) {
            return Players.find({
                createdBy: Meteor.user()._id
            });
        } else {
            this.ready();
        }

    }
});

var counter = 1,
    limit = 24;

// when the trashcan icon is clicked, the player is deleted
var removePlayer = function() {
    Players.remove({
        _id: Session.get('sPlayerId')
    });
};

Template.tHome.events({
    'click .add-player': function(evt, tmpl) {
        evt.preventDefault();

        function addInput() {

            if (counter === limit) {
                alert("You have reached the limit of adding " + counter + " inputs");
            } else {
                var newDiv = document.createElement('div');
                newDiv.className = 'player-box';
                newDiv.innerHTML = "<div class='form-group'><label>Player " + (counter + 1) + "</label><input type='text' class='form-control' name='players[]'><span class='remove-box'>X</span></div>";
                document.querySelector('.team-roster').appendChild(newDiv);
                counter++;
            }
        }
        addInput();
    },
    // when people add player boxes give them the option
    //  to remove them
    'click .remove-box': function(evt, tmpl) {
        evt.preventDefault();

        var elem = document.querySelector('.player-box');
        elem.remove();
    },

    'click .remove': function(evt, tmpl) {
        evt.preventDefault();

        if (confirm("Delete this player?")) {
            Session.set('sPlayerId', this._id);
            removePlayer();
            Session.set('sPlayerId', null);
        }
    },

    'submit form': function(evt) {
        evt.preventDefault();
        var myForm = document.getElementById("teamRoster");
        myFormInputs = myForm.getElementsByTagName("input");
        //Extract Each Element Value
        for (var i = 0; i < myFormInputs.length; i++) {
            // if (myForm.elements[i].value === "" ||
            //     myForm.elements[i].value == null ||
            //     myForm.elements[i].value == 'undefined') {

            // console.log(myForm.elements[i].value);

            Meteor.call('addPlayer', myForm.elements[i].value, function(error, id) {
                if (error) {
                    return alert(error.reason);
                }
                // make the inputs empty after submit
                // Router.go('playerPage', {
                //     _id: id
                // });
            });
            myForm.elements[i].value = "";
            // }

        }
    }
});
