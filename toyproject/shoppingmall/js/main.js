const $addBtn = document.querySelector(".addBtn");
const $addClose = document.querySelector(".addClose");
const $addPopup = document.querySelector(".list-add");
const $todoInput = document.querySelector(".todo-input");

$addBtn.addEventListener("click", () => {
    $addPopup.classList.add("on");
    $todoInput.focus();
})

$addClose.addEventListener("click", () => {
    $addPopup.classList.remove("on");
    $todoInput.value = '';
})


//icon 클릭 이벤트, 배경 이미지 미리 로드
const $iconBtn = document.querySelectorAll(".icon>li>button");
const $main = document.querySelector(".main");
let images = [];

for (let i = 0; i < $iconBtn.length; i++) {
    let img = new Image();
    img.src = `./img/desktop-0${i}.png`;
    img.onload = function() {
        images[i] = this;
    };
    $iconBtn[i].addEventListener("click", () => {
        $main.style.backgroundImage = `url(${images[i].src})`;
    })
}

//알림창
const $bell = document.querySelector(".bell");
const $bellBtn = document.querySelector(".bell-btn");

$bellBtn.addEventListener("click", ()=> {
    $bell.style.display = 'none';
})