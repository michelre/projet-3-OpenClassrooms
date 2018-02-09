ajaxGet(
  "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=00725f1585ae004d2043b59894843d43b6650b8e",
  function (reponse) {
    const api = JSON.parse(reponse);
    let markers = [];
    let stationClick;
    for (let i = 0; i < api.length; i++) {
      const iconMarker = {
        url: "js/images/marker-green.png",
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 20)
      };

      if (api[i].available_bikes === 0) {
        iconMarker.url = "js/images/marker-orange.png";
      } else if (api[i].status === "CLOSE") {
        iconMarker.url = "js/images/marker-red.png";
      }

      const marker = new google.maps.Marker({
        position: api[i].position,
        map: map,
        title: api[i].address,
        icon: iconMarker
      });

      // --------------- listener sur les markers ---------------
      google.maps.event.addListener(marker, "click", function () {
        stationClick = api[i];
        const reservation = document.querySelector("#reservation");
        const reserver = document.querySelector("#reserver");
        const confirmation = document.querySelector("#confirmation");

        reservation.style.display = "block";
        reserver.style.display = "block";
        confirmation.style.display = "none";
        reservation.scrollIntoView();

        if (api[i].status === "OPEN") {
          api[i].status = "OUVERTE";
        } else if (api[i].status === "CLOSE") {
          api[i].status = "FERMÉE";
        }

        infos.innerHTML = `
              <p>Adresse : <span>${api[i].address}</span><p>
              <p>État de la station: <span>${api[i].status}</span></p>
              <p>Vélos disponibles: <span>${api[i].available_bikes}</span></p>
              <p>Places disponibles: <span>${api[i].available_bike_stands}</span></p>
            `;
      });

      markers = markers.concat(marker);
    }

    // --------------- regroupement des markers ---------------
    const markerCluster = new MarkerClusterer(map, markers, {
      imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
    });

    const reservation = document.querySelector("#reservation");
    const infos = document.querySelector("#informations");
    const buttonConfirm = document.querySelector("#valider");
    const sectionTimer = document.querySelector("#timer");
    const buttonReserver = document.querySelector("#button-reservation").querySelector("button");

    // --------------- listener button réserver ---------------
    buttonReserver.addEventListener("click", function () {
      if (stationClick.available_bikes > 0) {
        confirmation.style.display = "block";
        reserver.style.display = "none";
      } else {
        confirmation.style.display = "none";
        reserver.style.display = "block";
        alert("aucun vélo n'est disponible dans cette station");
      }
    });

    // --------------- listener button valider ---------------
    buttonConfirm.addEventListener("click", function () {
      sectionTimer.style.display = "block";
      reservation.style.display = "none";
      sectionTimer.scrollIntoView();
      timer();
      time = 1200;
    });

    // --------------- timer ---------------
    let time = 1200;
    const textTimer = document.querySelector("#time");
    function timer() {
      sessionStorage.setItem("station", stationClick.address);
      const storage = sessionStorage.getItem("station");
      s = time;
      m = 0;
      if (s < 0) {
        clearTimeout(timer);
      } else {
        time--
        if (s > 59) {
          m = Math.floor(s / 60);
          s = s - m * 60;
        }
        if (s < 10) {
          s = "0" + s;
        }
        if (m < 10) {
          m = "0" + m;
        }
        textTimer.innerHTML =
          `Vous avez bien réservé un vélo ${storage} pour une durée de ${m}:${s}`
      }
      setTimeout(timer, 1000);
    }
  }
);

function initMap() {
  map = new google.maps.Map(document.querySelector("#map"), {
    center: {
      lat: 45.7616,
      lng: 4.8559
    },
    zoom: 13
  });
}