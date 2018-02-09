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
    let intervalID = 0;
    let time;
    const textTimer = document.querySelector("#time");
    buttonConfirm.addEventListener("click", function () {
      clearInterval(intervalID);
      sectionTimer.style.display = "block";
      reservation.style.display = "none";
      sectionTimer.scrollIntoView();
      const address = stationClick.address; //Il faut créer une copie de l'adresse plutôt que d'utiliser directement l'objet qui lui change à chaque fois que tu cliques sur un nouveau marker
      time = 1200;
      intervalID = setInterval(() => {
        sessionStorage.setItem("station", address);
        const storage = sessionStorage.getItem("station");
        const { minutes, seconds } = getMinutesAndSeconds(time);
        textTimer.innerHTML =
          `Vous avez bien réservé un vélo ${storage} pour une durée de ${minutes}:${seconds}`
        time = time - 1;
      }, 1000)
    });
  }
);

function getMinutesAndSeconds(time){
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  return { minutes, seconds };
}

function initMap() {
  map = new google.maps.Map(document.querySelector("#map"), {
    center: {
      lat: 45.7616,
      lng: 4.8559
    },
    zoom: 13
  });
}
