var map;

function initMap() {
    map = new google.maps.Map(document.querySelector("#map"), {
        center: {
            lat: 45.7616,
            lng: 4.8559
        },
        zoom: 13
    });
}

var req = new XMLHttpRequest();
req.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=00725f1585ae004d2043b59894843d43b6650b8e");
req.send(null);
console.log(req.responseText);