function getWeather() {
  const apiKey = "f00c38e0279b7bc85480c3fe775d518c";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
      alert("Error fetching current weather data. Please try again.");
    });

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching hourly forecast data:", error);
      alert("Error fetching hourly forecast data. Please try again.");
    });
}

function displayWeather(data) {
  const tempDivInfo = document.getElementById("temp-div");
  const weatherDivInfo = document.getElementById("weather-info");
  const humidityDivInfo = document.getElementById("humidity-info");
  const windspeedDivInfo = document.getElementById("windspeed-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  // Clear previous content
  weatherDivInfo.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";
  tempDivInfo.innerHTML = "";

  if (data.cod === "404") {
    weatherDivInfo.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15); // Celsius
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const weatherHtml = `<p>${description}</p>
      <p>Humidity: ${humidity}%</p>
       <p>Wind Speed: ${windSpeed} m/s</p>`;
    const temperatureHTML = `<p>${temperature}°C</p>
       `;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherDivInfo.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  // Clear previous hourly forecast
  hourlyForecastDiv.innerHTML = "";

  const next24Hours = hourlyData.slice(0, 24); // Display the next 24 hours

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000); // to milliseconds
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
              <div class="hourly-item">
                  <span>${hour}:00</span>
                  <img src="${iconUrl}" alt="Hourly Weather Icon">
                  <span>${temperature}°C</span>
              </div>
          `;

    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block"; 
}
