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
    const clickTarget = e.target;
    const clickTargetParentNode = e.target.parentNode;
    const clickTargetLi = clickTarget.closest('li');

    if (clickTargetParentNode.classList.contains('todolist-delete')) {
        deleteList(clickTargetParentNode.parentNode.id);
        clickTargetParentNode.parentNode.remove();
    } else if (clickTargetLi.tagName === 'LI') {
        clickTargetLi.classList.toggle('on');
        updateList(clickTargetLi.id);
    }
})


function createTodo(text, id, on = false) {
    let checkOn = '';
    if (on) {
        checkOn = `on`;
    }
    return (/*html*/
        `<li class="todolist-li ${checkOn}" id=${id} >
            <i class="fa-solid fa-square-check"></i>
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
            $todolistUl.innerHTML += createTodo(el.text, el.id, el.do);
        });
    }
}

function setList(text, id) {
    const listDataObj = {
        text: text,
        id: id,
        do: false,
    }
    listData.push(listDataObj);
    localStorage.setItem('listData', JSON.stringify(listData))
}

function deleteList(id) {
    listData = listData.filter(el => {
        return el.id != id;
    })
    localStorage.setItem('listData', JSON.stringify(listData));
}

function updateList(id) {
    const target = listData.find(el => el.id == id);
    if (target) {
        if (target.do) {
            target.do = false
        } else {
            target.do = true;
        }
    }
    localStorage.setItem('listData', JSON.stringify(listData));
}