function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp){
 let date = new Date(timestamp);
    let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    
celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showForecast(response){
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  forecastElement.innerHTML = `<div class="col-2">
        <h2>
            ${formatHours(forecast.dt * 1000)}
        </h2>
        
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
        
        <div class="row weather-forecast-temperature">
            <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
    </div>
   </div>`;

forecast = response.data.list [1];
forecastElement.innerHTML += `<div class="col-2">
        <h2>
            ${formatHours(forecast.dt * 1000)}
        </h2>
        
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
        
        <div class="row weather-forecast-temperature">
            <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
    </div>
   </div>`;

   forecast = response.data.list [2];
forecastElement.innerHTML += `<div class="col-2">
        <h2>
            ${formatHours(forecast.dt * 1000)}
        </h2>
        
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
        
        <div class="row weather-forecast-temperature">
            <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
    </div>
   </div>`;

   forecast = response.data.list [3];
forecastElement.innerHTML += `<div class="col-2">
        <h2>
            ${formatHours(forecast.dt * 1000)}
        </h2>
        
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
        
        <div class="row weather-forecast-temperature">
            <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
    </div>
   </div>`;

   forecast = response.data.list [4];
forecastElement.innerHTML += `<div class="col-2">
        <h2>
            ${formatHours(forecast.dt * 1000)}
        </h2>
        
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
        
        <div class="row weather-forecast-temperature">
            <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
    </div>
   </div>`;

   forecast = response.data.list [5];
forecastElement.innerHTML += `<div class="col-2">
        <h2>
            ${formatHours(forecast.dt * 1000)}
        </h2>
        
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
        
        <div class="row weather-forecast-temperature">
            <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
    </div>
   </div>`;
}

function search(city){
let apiKey = "b032d609bc74d1e42dce6078fbbffc67";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);

apiUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showForecast);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheit(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelsius(event){
    event.preventDefault();
     celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

search("Switzerland");