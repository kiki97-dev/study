const API_KEY = "d84c212efad64fce25a69f391dd59e90";
const $area = document.querySelector(".area");
const $weather = document.querySelector(".weather");
const $weatherIcon = document.querySelector(".weather-icon");

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError) //위치좌표


function onGeoOk(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            $weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            console.log($weatherIcon.src);
            $area.innerHTML = `${data.sys.country} ${data.name}`
            $weather.innerHTML = `${data.weather[0].main}  / ${data.main.temp}°C`
        })
        .catch(err => console.log(err));
}

function onGeoError() {
    console.log("위치 정보를 찾을수 없습니다");
}
