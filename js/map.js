$.getJSON('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=00725f1585ae004d2043b59894843d43b6650b8e')
  .then((data) => {
    createMarkers(initMap(), data)
  });

function createMarkers(map, dataAPI){
  // TODO
  const markers = dataAPI.map(({ position, address }) => {
    return new google.maps.Marker({
      position,
      map: map,
      title: address,
    })
  });
  new MarkerClusterer(map, markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}

function initMap() {
  return new google.maps.Map(document.querySelector("#map"), {
    center: {
      lat: 45.7616,
      lng: 4.8559
    },
    zoom: 12
  });
}
