const htmlElement = document.documentElement;
const suggestion = document.querySelector(".suggestion");
const weatherIcon = document.querySelector(".weather-icon");
const weatherLocation = document.querySelector(".weather-location");
const weatherTemperature = document.querySelector(".weather-temperature");

//Recover my current location
navigator.geolocation.getCurrentPosition(onSuccess, onError);

//Function to execute in case of error
function onError() {
    //Make the user activate the geolocation
    weatherLocation.innerText = "";
    weatherIcon.alt = "Geolocation disabled";
    weatherIcon.src = "./img/geolocation_disabled.png";
    suggestion.innerText = "Attiva la geolocalizzazione";

    //Disable loader
    htmlElement.className = "";
}

//Function to execute in case of success
function onSuccess() {
    console.log("Hai accettato la geolocalizzazione");
}