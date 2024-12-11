
window.onload = function () {
    var container = document.getElementById('wave-mov');
    var video = document.getElementById('swVideo');
    var message = document.getElementById('playMessage');
    var overlay = document.getElementById('overlay');

    video.muted = true;


    container.addEventListener('click', function () {
        if (video.paused) {
            // 재생
            video.play();
            message.style.display = 'none';
            overlay.style.display = 'none';
        } else {
            // 정지
            video.pause();
            message.style.display = 'block';
            overlay.style.display = 'block';
        }
    });

    video.addEventListener('loadeddata', function () {
        video.playbackRate = 0.1;
    });
};








const audio = new Audio();
let isPlaying = false;
let currentTrack = '';

// 모든 트랙 리스트 아이템에 이벤트 리스너 추가
document.querySelectorAll('.track-item-mini').forEach(track => {
    track.addEventListener('click', function () {
        const title = this.dataset.title;
        const artist = this.dataset.artist;

        // 현재 재생 중인 트랙을 다시 클릭한 경우
        if (currentTrack === title && isPlaying) {
            audio.pause();
            isPlaying = false;
            return;
        }

        // 다른 트랙을 클릭한 경우
        if (currentTrack !== title) {
            // 오디오 소스 변경
            audio.src = `audio/${title.toLowerCase().replace(/\s+/g, '-')}.mp3`;
            currentTrack = title;
        }

        // 재생
        audio.play();
        isPlaying = true;

        // 현재 트랙 정보 업데이트
        const currentTrackTitle = document.querySelector('.current-track .track-title');
        const currentTrackArtist = document.querySelector('.current-track .track-artist');
        currentTrackTitle.textContent = title;
        currentTrackArtist.textContent = artist;
    });
});

// 현재 트랙 이미지 클릭 시 재생/정지
document.querySelector('.current-track').addEventListener('click', function () {
    if (!currentTrack) return; // 선택된 트랙이 없으면 리턴

    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
});