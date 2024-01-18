navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError) //위치좌표

function onGeoOk(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    console.log(lat, lng);
}

function onGeoError() {
    console.log("위치 정보를 찾을수 없습니다");
}