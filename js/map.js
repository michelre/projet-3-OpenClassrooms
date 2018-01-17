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

