const btn = document.getElementById("actionBtn");
const status = document.getElementById("status");
const weatherBox = document.getElementById("weather");
const cityInput = document.getElementById("cityInput");

btn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  weatherBox.innerHTML = "";

  if (!city) {
    status.textContent = "Please enter a city name.";
    return;
  }

  btn.disabled = true;
  btn.textContent = "Loading...";
  status.textContent = "Fetching weather data...";

  try {
    const geoData = await (await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`
    )).json();

    if (!geoData.length) throw new Error("City not found.");

    const { lat, lon, display_name } = geoData[0];

    const pointData = await (await fetch(
      `https://api.weather.gov/points/${lat},${lon}`
    )).json();

    const [forecastData, hourlyData] = await Promise.all([
      fetch(pointData.properties.forecast).then(r => r.json()),
      fetch(pointData.properties.forecastHourly).then(r => r.json()),
    ]);

    const now = hourlyData.properties.periods[0];
    const today = forecastData.properties.periods[0];

    weatherBox.innerHTML = `
      <div class="box">
        <div class="big">${now.temperature}°${now.temperatureUnit}</div>
        <div>${now.shortForecast}</div>
      </div>

      <div class="box">
        <strong>Wind</strong>
        <div>${now.windSpeed} ${now.windDirection}</div>
      </div>

      <div class="box">
        <strong>Forecast</strong>
        <div>${today.detailedForecast}</div>
      </div>

      <div class="box">
        <strong>Location</strong>
        <div>${display_name}</div>
      </div>
    `;

    status.textContent = "Weather loaded successfully ✅";
  } catch (err) {
    status.textContent = `Error: ${err.message}`;
  } finally {
    btn.disabled = false;
    btn.textContent = "Get Weather";
  }
});
