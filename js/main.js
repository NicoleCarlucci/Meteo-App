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
async function onSuccess(position) {
    console.log(position);

    //Recover latitude and longitude
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    //Call Open Weather API
    const API_KEY = "7562f9615bcdf50505671541e83bcb42";
    const units = "metric";
    const lang = "it";


    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}&lang=${lang}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
    const iconCode = data.weather[0].icon;
    const description = data.weather[0].description;

    //Enter API call results in the page
    weatherLocation.innerText = data.name;
    weatherIcon.alt = description;
    weatherIcon.src = `./img/${iconCode}.png`;
    weatherTemperature.innerText = `${Math.floor(data.main.temp)}°`;
    suggestion.innerText = getSuggestion(iconCode);

    //Disable loader
    htmlElement.className = "";    
}

//Function to set appropried suggestion
function getSuggestion(iconCode) {
    const suggestions = {
        '01d': 'Ricordati la crema solare!',
        '01n': 'Buonanotte!',
        '02d': 'Oggi il sole va e viene...',
        '02n': 'Attenti ai lupi mannari...',
        '03d': 'Luce perfetta per fare foto!',
        '03n': 'Dormi sereno :)',
        '04d': 'Che cielo grigio :(',
        '04n': 'Non si vede nemmeno la luna!',
        '09d': 'Prendi l\'ombrello',
        '09n': 'Copriti bene!',
        '10d': 'Prendi l\'ombrello',
        '10n': 'Copriti bene!',
        '11d': 'Attento ai fulmini!',
        '11n': 'I lampi accendono la notte!',
        '13d': 'Esci a fare un pupazzo di neve!',
        '13n': 'Notte perfetta per stare sotto il piumone!',
        '50d': 'Accendi i fendinebbia!',
        '50n': 'Guida con prudenza!'
      };

      return suggestions[iconCode];
}


