let fetchLandmarks = function(location){

  const API_KEY1= 'AIzaSyDjy2x4r2qKGLUVpZelY6HRwngXkXywOQg'
  const API_KEY2 = 'AIzaSyDlfrEmPrLZ-wcx6_xn0Rh3lsLRPK9oGCQ';
  const API_KEY =  'AIzaSyDFpYbqt2v_O4_qN6bMCGAJfA2k4Z68xQY';
  const GOOGLE_PLACES_OUTPUT_FORMAT = "json";

  const GooglePlaces = require('googleplaces');

  const gp = new GooglePlaces(API_KEY, GOOGLE_PLACES_OUTPUT_FORMAT);

  let clientLocation = location ? location : [37.800344, -122.438906];

  let searchFor = [
    'airport', 'amusement_park', 'aquarium', 'art_gallery', 'church', 'city_hall', 'courthouse',
    'embassy', 'fire_station', 'hindu_temple', 'library', 'local_government_office','mosque',
    'movie_theater' , 'museum', 'park', 'police', 'post_office', 'stadium',
    'synagogue', 'university','zoo'
  ]

  let parameters = {
    location: clientLocation,
    rankby: 'distance',
  };

  let landmark = {};

  return Promise.all(searchFor.map(t => {
    parameters.type = t;
    return new Promise((resolve, reject) => {
      gp.nearBySearch(parameters, function(error, response){
        if(response.results[0] ) {
          resolve(response.results[0])
        } else {
          resolve(error)
        }
      });
    })
  })).then(allLandmarks => {

    let minDistance = 10000000000;
    allLandmarks.map(place => {
      if(place && Math.sqrt(Math.pow(place.geometry.location.lat-clientLocation[0], 2) + Math.pow(place.geometry.location.lng-clientLocation[1], 2))<=minDistance){
        landmark = place;
      }
    })
    return landmark
  }).catch(error => console.log(error))
}

module.exports = fetchLandmarks;
