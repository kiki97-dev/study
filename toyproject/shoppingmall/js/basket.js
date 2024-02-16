//장바구니 상품 리스트
//임의로 만든 샘플데이터
const basketItemList = [
    {
        id: 1,
        name: "크래킹 스냅 레글런 후드티",
        category: 1, // 카테고리->카테고리인덱스?
        price: 58000,
        image: "./img/pl_01.jpg",
        allOption: {
            size: ['S', 'M', 'L'],
            color: ['블랙', '그레이', '화이트']
        },
        choiceOption: {
            size: 'S',
            color: "블랙"
        },
        count: 1 //사용자가 장바구니에 담아놓은 수량
    },
    {
        id: 2,
        name: "1인용 원룸 일체형 매트리스 싱글침대 슈퍼싱글침대",
        category: 1,
        price: 119000,
        image: "./img/pl_02.jpg",
        allOption: {
            size: ['싱글 S', '슈퍼싱글 SS'],
        },
        choiceOption: {
            size: '싱글 S',
        },
        count: 2,
    },
    {
        id: 3,
        name: "농담곰 무드등",
        category: 1,
        price: 89000,
        image: "./img/pl_03.jpg",
        allOption: {
            size: ['소형', '중형'],
        },
        choiceOption: {
            size: '소형',
        },
        count: 3
    },

]
//장바구니에 넣은 제품 뿌려주는 ul태그
const $basketListWrap = document.querySelector('.basket-list-wrap');

basketItemList.forEach((item) => {
    //item정보 넣어서 li 만들고 ul안에다가 넣어줌
    $basketListWrap.innerHTML += createBasketLi(item);
})


//받아온 상품에 대한 정보를 li안에 맞게 넣어줌
function createBasketLi(item) {
    const { id, name, category, price, image, allOption, choiceOption, count } = item;
    //선택한 옵션 다 합쳐서 프린트해줄 글자 만들기
    let allchoiceOption = '';
    for (let key in choiceOption) {
        allchoiceOption += `${key} : ${choiceOption[key]} / `;
    }
    allchoiceOption = allchoiceOption.slice(0, -2);

    return (/*html*/
        `<li id="${id}" class="basket-list">
            <div class="basket_select">
                <input type="checkbox" name="" id="bs_check-01" style="display: none;">
                <label for="bs_check-01" class="bs_check-btn"></label>
                <button onclick="deleteBasketLi(this)">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="basket_product">
                <div class="basket_img">
                    <img src="${image}" alt="">
                </div>
                <div class="basket_info">
                    <p class="bi_title">${name}</p>
                    <p class="bi_option">${allchoiceOption}</p>
                    <button onclick="openOptionModal(this)">옵션변경</button>
                </div>
                <div class="basket_quantity">
                    <button onclick="decreaseCount(this)">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <span class="bq_count">${count}</span>
                    <button onclick="increaseCount(this)">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div class="bp_price">
                    <p>${(price * count).toLocaleString('ko-KR')}원</p>
                </div>

            </div>
        </li>`
    )
}

//장바구니 상품 삭제
function deleteBasketLi(e) {
    const item = e.closest('.basket-list');
    item.remove();
}

//수량증가
function increaseCount(e) {
    const item = e.closest('.basket-list');
    const target = basketItemList.find(obj => obj.id == item.id);
    target.count++;
    item.querySelector('.bq_count').innerHTML = `${target.count}`;
    item.querySelector('.bp_price>p').innerHTML = `${(target.count * target.price).toLocaleString('ko-KR')}원`;
}
//수량감소
function decreaseCount(e) {
    const item = e.closest('.basket-list');
    const target = basketItemList.find(obj => obj.id == item.id);
    if (!(target.count < 2)) {
        target.count--;
        item.querySelector('.bq_count').innerHTML = `${target.count}`;
        item.querySelector('.bp_price>p').innerHTML = `${(target.count * target.price).toLocaleString('ko-KR')}원`;
    }
}

//옵션 모달창 오픈, 닫기관련
const $optionModal = document.querySelector('.option_modal');

//옵션선택 모달창 오픈과 동시에 선택한 아이템의 객체값(정보) 불러와서 모달창 안에다가 뿌려주기
function openOptionModal(e) {
    const item = e.closest('.basket-list');
    const target = basketItemList.find(obj => obj.id == item.id);
    $optionModal.classList.add('on');
    $optionModal.id = item.id;
    document.body.style.overflow = 'hidden'; //모달창 오픈시 스크롤 막음

    //선택한 옵션 전체 돌려서 글자 값 만들어주기
    let allchoiceOption = '';
    for (let key in target.choiceOption) {
        allchoiceOption += `${key} : ${target.choiceOption[key]} / `;
    }
    allchoiceOption = allchoiceOption.slice(0, -2);

    //모달창 안에 정보 넣어주기
    $optionModal.querySelector('.om_img>img').src = target.image;
    $optionModal.querySelector('.omp_name>h3').innerHTML = target.name;
    $optionModal.querySelector('.omp_name>p').innerHTML = allchoiceOption;
    $optionModal.querySelector('.om_option-list>p').innerHTML = allchoiceOption;
    $optionModal.querySelector('.om_amount>span').innerHTML = target.count;
    $optionModal.querySelector('.om_price>p').innerHTML = `${(target.count * target.price).toLocaleString('ko-KR')}원`;
    
    //상품 옵션 불러오기
    let targetAllOption = target.allOption;
    for (let key in targetAllOption) {
        let optionName = key;
        let optionArr = targetAllOption[key];
        $optionModal.querySelector('.om_choice-wrap').innerHTML += createAllOption(optionName, optionArr);
    }

}

function closeOptionModal(e) {
    const item = e.closest('.basket-list');
    $optionModal.classList.remove('on');
    document.body.style.overflow = 'auto';
    $optionModal.querySelector('.om_choice-wrap').innerHTML = ''; //옵션창 비워줘야댐
}

//옵션창 수량증가
function increaseCountModal(e) {
    const item = e.closest('.option_modal');
    const target = basketItemList.find(obj => obj.id == item.id);
    let currentCount = Number(item.querySelector('.om_amount>span').innerHTML);
    currentCount++;
    item.querySelector('.om_amount>span').innerHTML = currentCount;
    item.querySelector('.om_price>p').innerHTML = `${(currentCount * target.price).toLocaleString('ko-KR')}원`;
}

//옵션창 수량감소
function decreaseCountModal(e) {
    const item = e.closest('.option_modal');
    const target = basketItemList.find(obj => obj.id == item.id);
    let currentCount = Number(item.querySelector('.om_amount>span').innerHTML);

    if (!(currentCount < 2)) {
        currentCount--;
        item.querySelector('.om_amount>span').innerHTML = currentCount;
        item.querySelector('.om_price>p').innerHTML = `${(currentCount * target.price).toLocaleString('ko-KR')}원`;
    }
}

//모달창 전체 옵션 리스트 dom 만들기
function createAllOption(key, arr) {
    let option = `<option value="" disabled>${key}</option>`;
    for(let i = 0 ; i< arr.length; i++) {
        option += `<option value="${i}">${arr[i]}</option>`;
    }

    return (/*html*/
        `<li class="om_choice">
            <select name="" id="">
                ${option}
            </select>
        </li>`
    )
}