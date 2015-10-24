Template.SeasonEdit.helpers({

  cSeason: function() {
    if (Meteor.user()) {
      return Seasons.findOne({
        _id: Session.get('sSeasonId')
      });
    }
  }
});

Template.SeasonEdit.events({

  'submit form#edit-season-form': function(evt, template) {
    var currentSeasonId,
        seasonProperties;

    evt.preventDefault();

    currentSeasonId = Session.get('sSeasonId');

    seasonProperties = {
      seasonName: $(evt.target).find('[name=seasonName]').val()
    };

    Seasons.update(currentSeasonId, {
      $set: seasonProperties
    }, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      Router.go('SeasonShow', {
        _id: currentSeasonId
      });
    });
  }
});
