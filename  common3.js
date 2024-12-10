const dots = document.querySelectorAll('.dot');
const slider = document.querySelector('.banner-slider');
const trackItems = document.querySelectorAll('.track-item-mini');
const currentTrackImg = document.querySelector('.current-track img');
const currentTrackTitle = document.querySelector('.current-track .track-title');
const currentTrackArtist = document.querySelector('.current-track .track-artist');
const audioPlayer = document.querySelector('.audio-player');
let currentSlide = 0;

// Banner slider functionality
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
        updateDots();
    });
});

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Track selection functionality
trackItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const title = item.dataset.title;
        const artist = item.dataset.artist;
        const img = item.querySelector('img').src;
        
        // Update current track display
        currentTrackImg.src = img;
        currentTrackTitle.textContent = title;
        currentTrackArtist.textContent = artist;
        
        // Update banner slide
        currentSlide = index;
        updateSlider();
        updateDots();
        
        // In a real implementation, you would update the audio source here
        audioPlayer.src = `path/to/${title}.mp3`;
        audioPlayer.play();
    });
});