const apiKey = "9d3e46843d2527f8337114cf2644ac20 "; // Replace with your OpenWeatherMap API key

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const errorMessage = document.getElementById("error-message");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    displayError("Please enter a city name.");
    return;
  }

  fetchWeatherData(city);
});

function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      displayError(error.message);
    });
}

function displayWeather(data) {
  errorMessage.classList.add("hidden");
  weatherInfo.classList.remove("hidden");

  cityName.textContent = data.name;
  temperature.textContent = `${data.main.temp}°C`;
  condition.textContent = data.weather[0].description;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${data.wind.speed} m/s`;
}

function displayError(message) {
  weatherInfo.classList.add("hidden");
  errorMessage.classList.remove("hidden");
  errorMessage.textContent = message;
}
