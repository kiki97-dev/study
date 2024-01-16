const addBtn = document.querySelector(".addBtn");
const addClose = document.querySelector(".addClose");
const addPopup = document.querySelector(".list-add");

addBtn.addEventListener("click", () => {
    addPopup.classList.add("on");
})

addClose.addEventListener("click", () => {
    addPopup.classList.remove("on");
})