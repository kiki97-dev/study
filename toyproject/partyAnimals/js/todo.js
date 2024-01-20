const $todoInputBtn = document.querySelector(".todo-input-btn");
const $todolistUl = document.querySelector(".todolist-ul");
let listData = JSON.parse(localStorage.getItem('listData')) ?? [];

//로컬스토리지에 값이 있으면 리스트 초기화
resetList();

$todoInputBtn.addEventListener("click", () => {
    const listId = Date.now();
    const listText = $todoInput.value;

    setList(listText, listId);
    $todolistUl.innerHTML += createTodo(listText, listId);

    $todoInput.value = "";
    $addPopup.classList.remove("on");
})

$todolistUl.addEventListener("click", (e) => {
    // 리스트 삭제 버튼 클릭시 li삭제
    const liDeleteBtn = e.target.parentNode;
    if (liDeleteBtn.classList.contains('todolist-delete')) {
        deleteList(liDeleteBtn.parentNode.id);
        liDeleteBtn.parentNode.remove();
    }
})


function createTodo(text, id) {
    return (
        `<li class="todolist-li" id=${id}>
            <p>${text}</p>
            <button class="todolist-delete">
                <i class="fa-solid fa-delete-left"></i>
            </button>
        </li>`
    )
}

function resetList() {
    if (listData.length > 0) {
        $todolistUl.innerHTML = '';
        listData.forEach(el => {
            $todolistUl.innerHTML += createTodo(el.text, el.id);
        });
    }
}

function setList(text ,id) {
    const listDataObj = {
        text: text,
        id: id,
        do: false,
    }
    listData.push(listDataObj);
    localStorage.setItem('listData', JSON.stringify(listData))
}

function deleteList(id) {
    listData = listData.filter(el=> {
        return el.id != id;
    })
    localStorage.setItem('listData', JSON.stringify(listData));
}