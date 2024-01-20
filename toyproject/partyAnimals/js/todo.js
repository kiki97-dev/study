const $todoInputBtn = document.querySelector(".todo-input-btn");
const $todolistUl = document.querySelector(".todolist-ul");
const $todoInput = document.querySelector(".todo-input");

$todoInputBtn.addEventListener("click", () => {
    $todolistUl.innerHTML += createTodo($todoInput.value);
    $todoInput.value = "";
    $addPopup.classList.remove("on");
})

$todolistUl.addEventListener("click",(e)=> {
    // 리스트 삭제 버튼 클릭시 li삭제
    const liDeleteBtn = e.target.parentNode;
    if(liDeleteBtn.classList.contains('todolist-delete')){
        liDeleteBtn.parentNode.remove();
    }
})


function createTodo(text) {
    return (
        `<li class="todolist-li">
            <p>${text}</p>
            <button class="todolist-delete">
                <i class="fa-solid fa-delete-left"></i>
            </button>
        </li>`
    )
}
