/* 모든 페이지에서 공용으로 사용할 부분 */
document.addEventListener('DOMContentLoaded', function () {
    // HTML 로딩이 완료된 후 실행할 코드
    window.addEventListener('load', () => {
        loadHeader().then(() => {
            // 검색버튼 안만들어서 비활성화
            const $headerSearchBtn = document.querySelector('.h_search');
            $headerSearchBtn.addEventListener("click", (e)=> {
                e.preventDefault();
            });

            // 카테고리 호버시 메뉴 펼침
            const $hmCategory = document.querySelector('.hm_category');
            $hmCategory.addEventListener('mouseover', function(){
                $hmCategory.classList.add('on');
            })
            $hmCategory.addEventListener('mouseout', function(){
                $hmCategory.classList.remove('on');
            })

            



            
            // header02탑버튼
            /* const $topBtn = document.querySelector('.h_top>button')
            $topBtn.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                });
            }) */
        }).catch(err => {
            console.error('헤더 로드 실패:', err);
        });
    });
    window.addEventListener('load', loadFooter);


    // 탑버튼  

});


async function loadHeader() {
    const response = await fetch('./common/header.html');
    const headerHTML = await response.text();

    document.querySelector('.header').innerHTML = headerHTML;
}

async function loadFooter() {
    const response = await fetch('./common/footer.html');
    const footerHTML = await response.text();

    document.querySelector('.footer').innerHTML = footerHTML;
}