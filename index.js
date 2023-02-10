function timeShow(time) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = weekdays[time.getDay()];
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0 ${hour} `;
  }
  let min = time.getMinutes();
  if (min < 10) {
    min = `0 ${min} `;
  }
  let timeText = `${day} ${hour}:${min} `;
  return timeText;
}
let date = new Date();
let timeElement = document.getElementById("time");
timeElement.innerHTML = timeShow(date);

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  document.getElementById("temp").innerHTML = temp;
  let city = response.data.name;
  document.getElementById("city").innerHTML = city;
  let humidity = response.data.main.humidity;
  document.getElementById("humidity").innerHTML = humidity;
  let wind = Math.round(response.data.wind.speed);
  document.getElementById("wind").innerHTML = wind;
}

function searchCity(city) {
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function cityShow(event) {
  event.preventDefault();
  let city = document.getElementById("city-input").value;
  searchCity(city);
}
let input = document.getElementById("search-form");
input.addEventListener("submit", cityShow);

//function searching() {let searchInput = document.querySelector("#city-input");
// if (searchInput.value) {searchInput.value = `Searching for ${searchInput.value}... `;}}
//let form = document.getElementById("search-form");
//form.addEventListener("submit", searching);

function showFarenTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round((temperature * 9) / 5) + 32;
  event.target.classList.add("gray");
}
let farenTemp = document.querySelector("#fr");
farenTemp.addEventListener("click", showFarenTemp);

function showCeliTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = (Math.round(temperature - 32) * 5) / 9;
  event.target.classList.add("gray");
}
let CeliTemp = document.querySelector("#cel");
CeliTemp.addEventListener("click", showCeliTemp);

function showCurrentTemp(response) {
  let temp = Math.round(response.data.main.temp);
  document.getElementById("temp").innerHTML = temp;
  let city = response.data.name;
  document.getElementById("city").innerHTML = city;
  let humidity = response.data.main.humidity;
  document.getElementById("humidity").innerHTML = humidity;
  let wind = Math.round(response.data.wind.speed);
  document.getElementById("wind").innerHTML = wind;
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentTemp);
}

function navigateGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let current = document.getElementById("current");
current.addEventListener("click", navigateGeolocation);
