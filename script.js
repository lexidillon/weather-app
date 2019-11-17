let now = new Date();
let p = document.querySelector("p");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let month = now.getMonth();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let calendarMonth = months[now.getMonth()];

p.innerHTML = `${day}, ${calendarMonth} ${date}, ${year}, ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  if (cityInput.value.length) {
    let h2 = document.querySelector("h2");
    h2.innerHTML =
      cityInput.value
        .trim()
        .charAt(0)
        .toUpperCase() + cityInput.value.trim().slice(1);
  }
  let apiKey = "4744f550ff3726f13bea4b0bd2c169d9";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(searchTemperature);
}

function searchTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let mainTemperature = document.querySelector("#mainTemperature");
  mainTemperature.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector("#weather-status");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/10d@2x.png`
  );
}

let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", search);

//Current City Button
function getCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4744f550ff3726f13bea4b0bd2c169d9";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${cityName}`;
  let mainTemperature = document.querySelector("#mainTemperature");
  mainTemperature.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector("#weather-status");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/10d@2x.png`
  );
}

let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", getCurrentWeather);
