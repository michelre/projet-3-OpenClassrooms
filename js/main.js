const imageSlider = document.querySelector("#slider").querySelector("img");
const flecheGauche = document.querySelector("#flechegauche");
const flecheDroite = document.querySelector("#flechedroite");
let imageIndex = 0;
const images = [
    "images/slider1.jpg",
    "images/slider2.jpg",
    "images/slider3.jpg",
    "images/slider4.jpg",
    "images/slider5.jpg"
];

flecheGauche.addEventListener("click", precedente);
flecheDroite.addEventListener("click", suivante);

function suivante() {
    imageIndex++;
    if (imageIndex > images.length - 1){
        imageIndex = 0;
    }
    imageSlider.setAttribute("src", images[imageIndex]);
}

function precedente() {
    imageIndex--;
    if (imageIndex < 0){
        imageIndex = images.length - 1;
    }
    imageSlider.setAttribute("src", images[imageIndex]);
}

document.addEventListener("keydown", function(clavier){
    if(clavier.keyCode === 37){
        precedente();
    }
    else if(clavier.keyCode === 39){
        suivante();
    }
    });

