import pageElements from "./pageElements.js";
import { ajax } from "./api.js";

function createSlides(discountId){
    const image = document.createElement("img");
    image.src = `images/discounts-${discountId}.png`;
    const sliderItemWrapper = document.createElement("div");
    sliderItemWrapper.appendChild(image);
    var slides = document.getElementById(pageElements.slider);
    slides.appendChild(sliderItemWrapper);
}

function createSlider() {
    // create slider
    const slider = document.createElement("div");
    slider.id = pageElements.slider;
    slider.className = "slides";

    // attach slider to catalog
    var catalog = document.getElementById(pageElements.catalog);
    catalog.appendChild(slider);
}

export async function loadAndShowSliderAsync() {
    createSlider();
    
    let slides = await ajax("discounts");
    slides.forEach(createSlides);
}