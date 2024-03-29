const API_KEY = "d84c212efad64fce25a69f391dd59e90";
const $area = document.querySelector(".area");
const $weather = document.querySelector(".weather");
const $weatherIcon = document.querySelector(".weather-icon");
let weatherData = JSON.parse(localStorage.getItem('weatherData')) ?? null;
const now = Date.now();


if (!weatherData) {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError) //위치좌표
} else if ((now - weatherData.date) > 300000) {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError) //위치좌표
} else {
    createWeatherDom();
}




function onGeoOk(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            weatherData = data;
            weatherData.date = Date.now();
            localStorage.setItem('weatherData', JSON.stringify(weatherData))

            createWeatherDom()
        })
        .catch(err => console.log(err));
}

function onGeoError() {
    console.log("위치 정보를 찾을수 없습니다");
}

function createWeatherDom() {
    $weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    $area.innerHTML = `${weatherData.sys.country} ${weatherData.name}`
    $weather.innerHTML = `${weatherData.weather[0].main}  / ${weatherData.main.temp}°C`
}