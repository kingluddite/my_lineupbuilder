Template.santaMap.rendered = function(){

  var setSantaLocation = function(latitude,longitude){
    // Create a Mapbox LatLng object with our passed values.
    var location = L.latLng(latitude,longitude);

    // Pan our map to the new location.
    map.panTo(location);

    // Move our marker to the new location.
    marker.setLatLng(location);
  }

  var loadDefaultData = function(){
    // Wrap our findOne and Session.set's in a Tracker.autorun so that when
    // the necessary data becomes available, we can fire our setSantaLocation()
    // function and update the map.
    Tracker.autorun(function(){
      var currentLocation = Stops.findOne({"current": true}, {fields: {"longitude": 1, "latitude": 1} });
      if ( currentLocation ) {
        Meteor.setTimeout(function(){
          setSantaLocation(currentLocation.latitude,currentLocation.longitude);
        },500);
      }
    });
  }

  L.mapbox.accessToken = "pk.eyJ1Ijoic29jY2VybWF0dGVycyIsImEiOiJjaWc0bDQ2anMyeGRtdHBrdm5mY21vbDRmIn0.nGeqe80E71D7pbD-5BepaQ";

  var map = L.mapbox.map('map', 'soccermatters.o31blk1e', {
    zoom: 3,
    minZoom: 3,
    maxZoom: 6
  }).on('ready', loadDefaultData());

  var santaIcon = L.icon({
    iconUrl: '/img/santa-marker.svg',
    iconSize: [48,48]
  });

  var marker = L.marker([0, 0], {
    icon: santaIcon
  }).addTo(map);
}

Template.santaMap.helpers({

  isNorthPole: function(){
    var getLocation = Stops.findOne({"current": true}, {fields: {"name": 1, "current": 1, "order": 1}});
    if ( getLocation.name == "The North Pole" && getLocation.order == 1 ) {
      Session.set('isSantaFinished', false);
      return true;
    } else if ( getLocation.name == "The North Pole" && getLocation.order == 333 ) {
      Session.set('isSantaFinished', true);
      return true;
    } else {
      return false;
    }
  },

  isSantaFinished: function(){
    return Session.get('isSantaFinished');
  }

});
