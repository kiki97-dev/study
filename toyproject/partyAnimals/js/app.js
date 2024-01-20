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
