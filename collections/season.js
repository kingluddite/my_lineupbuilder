Seasons = new Meteor.Collection('seasons');

validateSeason = function(season) {
  var errors;

  errors = {};
  if (!season.seasonName)
    errors.name = "Please enter a season Name";
  return errors;
}
