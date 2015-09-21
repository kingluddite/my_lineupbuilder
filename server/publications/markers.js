Meteor.publish('map-markers', function() {
  return Markers.find();
});
