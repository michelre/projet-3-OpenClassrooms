const imageSlider = document.querySelector("#slider").querySelector("img");
const flecheGauche = document.querySelector("#flechegauche");
const flecheDroite = document.querySelector("#flechedroite");

// Objet slider
const slider = {
    index: 0,
    image: [
        "images/slider1.jpg",
        "images/slider2.jpg",
        "images/slider3.jpg",
        "images/slider4.jpg",
        "images/slider5.jpg"  
        ],

    suivant: function() {
        slider.index++;
        if (slider.index > slider.image.length - 1){
            slider.index = 0;
        }
        imageSlider.setAttribute("src", slider.image[slider.index]);
    },

    precedent: function() {
        slider.index--;
        if (slider.index < 0){
            slider.index = slider.image.length - 1;
        }
        imageSlider.setAttribute("src", slider.image[slider.index]);
    },

    clavier: function(e) {   
        var code = e.keyCode;
        switch(code) {
        case 39: slider.suivant();
        break;
        case 37: slider.precedent();
        break;
        }
    }
};

// listener fleches et clavier
flecheDroite.addEventListener("click", function(){
    slider.suivant();
});

flecheGauche.addEventListener("click", function(){
    slider.precedent();
});

document.addEventListener("keydown", slider.clavier);
console.log(slider);