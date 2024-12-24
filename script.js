const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const unitToggle = document.getElementById("unitToggle");

let isCelsius = true;

// Weather condition backgrounds
const weatherBackgrounds = {
    Clear: "url('src/sun-3588618_1920.jpg')",
    Clouds: "url('src/clouds-summer-weather-5k-1b-1600x900.jpg')",
    Rain: "url('src/rain_trees_lights_75431_1600x900.jpg')",
    Drizzle: "url('src/women-bokeh-rain-7q-1600x900.jpg')",
    Thunderstorm: "url('src/thunderstorm-01-1600x900.jpg')",
    Snow: "url('src/winter_trees_snow_133567_1600x900.jpg')",
    Mist: "url('src/car-light-road-autumn-trees-foggy-weather-y9-1600x900.jpg')",
    Haze: "url('src/fog_alone_bw_126054_1600x900.jpg')",
    Default: "url('src/timeless-beauty-of-mount-fuji-japan-xu-1600x900.jpg')",
};

// Fetch weather by city
async function fetchWeather(city) {
    try {
        showLoading();
        hideError();
        const apiKey = "4d7fef95a3424e5c9f59307b618150ea";
        const unit = isCelsius ? "metric" : "imperial";
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
        );

        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        displayWeather(data);
    } catch (err) {
        showError(err.message);
    } finally {
        hideLoading();
    }
}



// Display weather data
function displayWeather(data) {
    weatherResult.classList.remove("hidden");
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp} °${isCelsius ? "C" : "F"}`;
    description.textContent = `Weather: ${data.weather[0].description}`;    
    weatherIcon.textContent = getWeatherIcon(data.weather[0].main);

    // Change the background based on weather condition
    changeBackground(data.weather[0].main);
}

// Change background based on condition
function changeBackground(condition) {
    const backgroundImage = weatherBackgrounds[condition] || weatherBackgrounds["Default"];
    document.body.style.backgroundImage = backgroundImage;
}

// Get weather icon
function getWeatherIcon(condition) {
    const icons = {
        Clear: "☀️",
        Clouds: "☁️",
        Rain: "🌧️",
        Drizzle: "🌦️",
        Thunderstorm: "⛈️",
        Snow: "❄️",
        Mist: "🌫️",
        Haze :"🌁"
    };
    return icons[condition] || "🌍";
}

// Utility functions
function showLoading() {
    loading.classList.remove("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    error.classList.remove("hidden");
    document.getElementById("errorMessage").textContent = message;
    weatherResult.classList.add("hidden");
}

function hideError() {
    error.classList.add("hidden");
}

// Event listeners
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
});



unitToggle.addEventListener("click", () => {
    isCelsius = !isCelsius;
    unitToggle.textContent = `Switch to °${isCelsius ? "F" : "C"}`;
    if (cityName.textContent) fetchWeather(cityName.textContent.split(",")[0]);
});
