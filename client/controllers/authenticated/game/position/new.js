Template.PositionNew.helpers({
  sGameId: function() {
    return Session.get('sGameId');
  },

  currentFormation: function() {
    var currGame,
        currFormation;

    currGame = Games.findOne({
      _id: Session.get('sGameId')
    });

    currFormation = currGame.myFormation;
    if (currFormation) {
      return currFormation;
    } else {
      return '4-4-2';
    }

  }
});

Template.PositionNew.events({
  'focus input': function(evt, template) {
    var myForm,
        allInputs,
        i;

    // console.log(evt.target);
    $(evt.target).css('width', '300px');
    $(evt.target).css('border', '1px solid #f00');
    $(evt.target).addClass('my-focus');
    myForm = document.getElementById('new-position-form');
    allInputs = myForm.getElementsByTagName('input');
    for (i = 0; i < allInputs.length; i++) {
      if ($(allInputs[i]).hasClass('my-focus')) {
        $(allInputs[i]).fadeTo('slow', 1);
      } else {
        $(allInputs[i]).fadeTo('slow', .4).removeClass('my-focus');
      }
    }
  },
  'blur input': function(evt, template) {
    $(evt.target).css('width', '50px');
    $(evt.target).css('border', 'none');
  },

  // when add team form is submitted
  //  grab the form data and pass it to the server
  'submit form#new-position-form': function(evt, template) {
    var currentGameId,
        playerPositions,
        allGamePositions;

    evt.preventDefault();

    currentGameId = Session.get('sGameId');

    playerPositions = {
      player01: {
        fieldPosition: $(evt.target).find('[name=player01]').val(),
        lastModified: new Date().getTime()
      },
      player02: {
        fieldPosition: $(evt.target).find('[name=player02]').val(),
        lastModified: new Date().getTime()
      },
      player03: {
        fieldPosition: $(evt.target).find('[name=player03]').val(),
        lastModified: new Date().getTime()
      },
      player04: {
        fieldPosition: $(evt.target).find('[name=player04]').val(),
        lastModified: new Date().getTime()
      },
      player05: {
        fieldPosition: $(evt.target).find('[name=player05]').val(),
        lastModified: new Date().getTime()
      },
      player06: {
        fieldPosition: $(evt.target).find('[name=player06]').val(),
        lastModified: new Date().getTime()
      },
      player07: {
        fieldPosition: $(evt.target).find('[name=player07]').val(),
        lastModified: new Date().getTime()
      },
      player08: {
        fieldPosition: $(evt.target).find('[name=player08]').val(),
        lastModified: new Date().getTime()
      },
      player09: {
        fieldPosition: $(evt.target).find('[name=player09]').val(),
        lastModified: new Date().getTime()
      },
      player10: {
        fieldPosition: $(evt.target).find('[name=player10]').val(),
        lastModified: new Date().getTime()
      },
      player11: {
        fieldPosition: $(evt.target).find('[name=player11]').val(),
        lastModified: new Date().getTime()
      }
    };

    // we store all the positions in an array of objects
    allGamePositions = {
      playerGameInfo: [
        playerPositions
      ]
    }

    Games.update(currentGameId, {
      $set: allGamePositions
    }, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      Session.setPersistent('sPositionsNamed', true);
      Router.go('GameShow', {
        _id: currentGameId
      });
    });
    
    // client side alert
    Bert.alert('Positions Named', 'success', 'growl-top-right');
  }
});
