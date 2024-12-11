document.addEventListener('DOMContentLoaded', function() {
    const gridView = document.querySelector('.main-grid');
    const cardView = document.querySelector('.Card');
    const viewToggle = document.querySelector('.view-toggle');
    const toggleBtns = viewToggle.querySelectorAll('button');  


    gridView.classList.add('active');
    toggleBtns[0].classList.add('active');  

    toggleBtns.forEach(btn => {
        btn.classList.add('toggle-btn'); 

        btn.addEventListener('click', function() {

            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');


            const viewMode = this.dataset.view;
            if (viewMode === 'grid') {
                gridView.classList.add('active');
                cardView.classList.remove('active');
            } else {
                cardView.classList.add('active');
                gridView.classList.remove('active');
            }


            const targetView = viewMode === 'grid' ? gridView : cardView;
            targetView.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});


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

  
    for (let i = 0; i < 8; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const shuffled = shuffleArray([...currentArray]);
        updateText(shuffled.join(''));
        currentArray = shuffled;
    }


    await new Promise(resolve => setTimeout(resolve, 300));
    updateText(targetText);


    setTimeout(() => {
        isAnimating = false;
        animateToTarget();
    }, 2000);
}


createLetters(startText);
setTimeout(animateToTarget, 1000);





