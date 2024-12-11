document.addEventListener('DOMContentLoaded', function() {
    const images = [
      'img/K01.jpg', 'img/K02.jpg', 'img/K03.jpg',
      'img/J01.jpg', 'img/J02.jpg', 'img/B01.jpg',
      'img/B02.jpg', 'img/O01.jpg', 'img/O02.jpg',
      'img/W01.jpg'
    ];
  
    const topTexts = [
      '강원도 강릉시 - 초당동', '강원도, 경포해변', '강원도, 경포해변',
      '제주도, 월정리 해수욕장', '제주 구좌읍, 평대리 해변', '부산 광안리 해수욕장',
      '부산 광안리 해수욕장', '오이도 시흥시 - 정왕 3동', '인천 바다, 월미도 해변',
      '오이도 불꽃놀이'
    ];
  
    const bottomTexts = [
      '2023.01.04.', '2023.01.05.', '2023.01.05.',
      '2024.02.28.', '2024.02.28.', '2024.07.18.',
      '2024.07.18.', '2023.05.05.', '2023.08.13.',
      '2023.05.05.'
    ];
  
    const imagePositions = [0,1,2,3,6,7,9,11,12,15];
    const cells = Array(16).fill(null).map((_, index) => ({
      id: index,
      hasImage: imagePositions.includes(index),
      image: imagePositions.includes(index) ? 
        images[imagePositions.indexOf(index)] : null
    }));
  
    function renderGrid() {
      const grid = document.getElementById('grid');
      grid.innerHTML = '';
      cells.forEach(cell => {
        const div = document.createElement('div');
        div.className = 'grid-item';
        if (cell.hasImage) {
          const img = document.createElement('img');
          img.src = cell.image;
          img.alt = `Image ${cell.id + 1}`;
          
          const overlay = document.createElement('div');
          overlay.className = 'hover-overlay';
          
          const topText = document.createElement('div');
          topText.className = 'hover-text-top';
          topText.textContent = topTexts[imagePositions.indexOf(cell.id)];
          
          const bottomText = document.createElement('div');
          bottomText.className = 'hover-text-bottom';
          bottomText.textContent = bottomTexts[imagePositions.indexOf(cell.id)];
          
          overlay.appendChild(topText);
          overlay.appendChild(bottomText);
          
          div.appendChild(img);
          div.appendChild(overlay);
        }
        grid.appendChild(div);
      });
    }
  
    function shuffleGrid() {
      for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
      }
      renderGrid();
    }
  
    const button = document.getElementById('shuffleButton');
    if (button) {
      button.addEventListener('click', shuffleGrid);
    }
    renderGrid();
  });






