// Display Current Date and Time by Refreshing Page

let now = new Date();
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let timeNow = document.querySelector("#time-now");
timeNow.innerHTML = `${daysOfWeek[now.getDay()]}, ${now.getHours()}:${minutes}`;

// Find Current City's Data

function showCurrentCityData(response) {
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${response.data.name}`;

  let tempCelsius = Math.round(response.data.main.temp);
  let tempFahrenheit = Math.round((9 / 5) * response.data.main.temp + 32);
  let tempNow = document.querySelector("#temp-now");
  tempNow.innerHTML = `${tempCelsius}°C | ${tempFahrenheit}°F`;

  let windKmph = Math.round(response.data.wind.speed);
  let windMph = Math.round(0.621371 * response.data.wind.speed);
  let windNowMetric = document.querySelector("#wind-now-metric");
  windNowMetric.innerHTML = `${windKmph} km/h`;
  let windNowImperial = document.querySelector("#wind-now-imperial");
  windNowImperial.innerHTML = `${windMph} mph`;
}

function findPosition(position) {
  let myLat = position.coords.latitude;
  let myLong = position.coords.longitude;
  console.log(`Latitude: ${myLat}, Longitude: ${myLong}`);
  let units = "metric";
  let apiKey = "b6a37e0dd805d5da5a0b7740137a95f2";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&APPID=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showCurrentCityData);
}

function clickLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", clickLocation);

// Input City Name and Click Submit

function showCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${
    form.input.value.charAt(0).toUpperCase() +
    form.input.value.slice(1).toLowerCase()
  }`;
}

function showWeather(event) {
  event.preventDefault();

  let city = form.input.value;
  city = city.trim().toLowerCase();

  let units = "metric";
  let apiKey = "b6a37e0dd805d5da5a0b7740137a95f2";
  let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${units}`;

  function retrieveWeather(response) {
    console.log(response);

    let tempCelsius = Math.round(response.data.main.temp);
    let tempFahrenheit = Math.round((9 / 5) * response.data.main.temp + 32);
    let tempNow = document.querySelector("#temp-now");
    tempNow.innerHTML = `${tempCelsius}°C | ${tempFahrenheit}°F`;

    let windKmph = Math.round(response.data.wind.speed);
    let windMph = Math.round(0.621371 * response.data.wind.speed);
    let windNowMetric = document.querySelector("#wind-now-metric");
    windNowMetric.innerHTML = `${windKmph} km/h`;
    let windNowImperial = document.querySelector("#wind-now-imperial");
    windNowImperial.innerHTML = `${windMph} mph`;
  }

  axios.get(endpoint).then(retrieveWeather);
}

function showCityWeather(event) {
  showCity(event);
  showWeather(event);
}

let form = document.querySelector("form");
form.addEventListener("submit", showCityWeather);
