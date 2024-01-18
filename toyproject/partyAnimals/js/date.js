const todolistDay = document.querySelector(".todolist-day");
const todolistClock = document.querySelector(".todolist-clock");

todolistDay.innerHTML = formatDate();
setInterval(()=> {
    todolistClock.innerHTML = formatTime();
},1000)

function formatDate() {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
    const day = String(now.getDate()).padStart(2, "0");
    const dayOfWeek = daysOfWeek[now.getDay()];

    const formattedDate = `${year}.${month}.${day} (${dayOfWeek})`;

    return formattedDate;
}

function formatTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return formattedTime;
}
