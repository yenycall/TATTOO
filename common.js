document.addEventListener('DOMContentLoaded', function() {
    const gridView = document.querySelector('.main-grid');
    const cardView = document.querySelector('.Card');
    const viewToggle = document.querySelector('.view-toggle');
    const toggleBtns = viewToggle.querySelectorAll('button');  // 모든 토글 버튼 선택

    // 초기 상태 설정
    gridView.classList.add('active');
    toggleBtns[0].classList.add('active');  // 첫 번째 버튼 활성화

    toggleBtns.forEach(btn => {
        btn.classList.add('toggle-btn');  // 토글 버튼 클래스 추가

        btn.addEventListener('click', function() {
            // 버튼 활성화 상태 변경
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 뷰 모드 변경
            const viewMode = this.dataset.view;
            if (viewMode === 'grid') {
                gridView.classList.add('active');
                cardView.classList.remove('active');
            } else {
                cardView.classList.add('active');
                gridView.classList.remove('active');
            }

            // 해당 뷰로 스크롤
            const targetView = viewMode === 'grid' ? gridView : cardView;
            targetView.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});

// 메인 타이포 애니메이션

const startText = 'TATTOO';
const targetText = 'TATOTO';
let currentText = startText;
let isAnimating = false;

function createLetters(text) {
    const container = document.getElementById('text-container');
    container.innerHTML = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = char;
        container.appendChild(span);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateText(text) {
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, i) => {
        letter.textContent = text[i];
        letter.style.color = (text === startText || text === targetText) ? '#ff3a3a' : '#212121';
        letter.classList.add('shuffle');
        setTimeout(() => letter.classList.remove('shuffle'), 300);
    });
}

async function animateToTarget() {
    if (isAnimating) return;
    isAnimating = true;

    let currentArray = startText.split('');
    createLetters(currentArray.join(''));

    // 여러 번 무작위로 섞기
    for (let i = 0; i < 8; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const shuffled = shuffleArray([...currentArray]);
        updateText(shuffled.join(''));
        currentArray = shuffled;
    }

    // 최종적으로 목표 텍스트로 변환
    await new Promise(resolve => setTimeout(resolve, 300));
    updateText(targetText);

    // 잠시 기다린 후 다시 시작
    setTimeout(() => {
        isAnimating = false;
        animateToTarget();
    }, 2000);
}

// 초기 애니메이션 시작
createLetters(startText);
setTimeout(animateToTarget, 1000);





