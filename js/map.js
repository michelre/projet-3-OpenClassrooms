$.getJSON('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=00725f1585ae004d2043b59894843d43b6650b8e')
  .then((data) => {
    createMarkers(initMap(), data)
  });

function createMarkers(map, dataAPI){
  // TODO
  let markers = []
  for(let i = 0; i < dataAPI.length; i++){
    const marker = new google.maps.Marker({
      position: dataAPI[i].position,
      map: map,
      title: dataAPI[i].address,
    })
    google.maps.event.addListener(marker, 'click', function(){
      $('#address').html(dataAPI[i].address)
      console.log(dataAPI[i])
    })
    markers = markers.concat(marker)
  }
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
