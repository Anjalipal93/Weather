const apiKey = "dc10d98febf78f4178d56a0b2bbdc071";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function showLoader() {
    document.querySelector(".loader").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "none";
}

function hideLoader() {
    document.querySelector(".loader").style.display = "none";
}

async function checkWeather(city) {
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    showLoader();

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        const weatherName = data.weather[0].main;
        if (weatherName === "Clouds") weatherIcon.src = "images/clouds.png";
        else if (weatherName === "Clear") weatherIcon.src = "images/clear.png";
        else if (weatherName === "Rain") weatherIcon.src = "images/rain.png";
        else if (weatherName === "Drizzle") weatherIcon.src = "images/drizzle.png";
        else if (weatherName === "Mist" || weatherName === "Haze") weatherIcon.src = "images/mist.png";
        else weatherIcon.src = "images/default.png";

        let currentTime = data.dt;
        let sunrise = data.sys.sunrise;
        let sunset = data.sys.sunset;

        if (currentTime >= sunrise && currentTime <= sunset) {
            document.body.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
        } else {
            document.body.style.background = "linear-gradient(135deg, #2c3e50, #4ca1af)";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        console.log(error.message);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }

    hideLoader();
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});
