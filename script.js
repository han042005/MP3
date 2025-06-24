const playButton = document.getElementById('play-button');
const playIcon = document.getElementById('play-icon');
const audioPlayer = document.getElementById('audio-player');

const songTitle = document.querySelector('.song-title');
const songImage = document.getElementById('song-image');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');

const playImage = 'play.png';
const pauseImage = 'pause.png';

let isPlaying = false;
let currentSongIndex = 0;

const songs = [
    {
        title: 'Kawaikute Gomen',
        audioSrc: 'Kawaikute Gomen.mp3',
        imageSrc: 'khung.gif'
    },
    {
        title: 'Tabun',
        audioSrc: 'Tabun.mp3',
        imageSrc: 'khung2.gif'
    },
    {
        title: 'Yoru Ni Kakeru',
        audioSrc: 'yoru ni kakeru.mp3',
        imageSrc: 'Khung3.gif'
    },
    {
        title: 'Has Ever',
        audioSrc: 'Từng.mp3',
        imageSrc: 'khung4.gif'
    },
    {
        title: 'Sinking Town',
        audioSrc: 'Sinking town.mp3',
        imageSrc: 'khung15.gif'
    },
    {
        title: 'Moshi Moshi',
        audioSrc: 'Moshi Moshi.mp3',
        imageSrc: 'khung13.gif'
    },
    {
    title: 'Em Xinh Em Blink',
        audioSrc: 'Em xinh em blink.mp3',
        imageSrc: 'khung5.gif'
    },
    {
    title: 'The Lost Kid',
        audioSrc: 'the lost kid.mp3',
        imageSrc: 'khung8.gif'
    },
    {
    title: 'Think About You',
        audioSrc: 'Think about you.mp3',
        imageSrc: 'khung6.gif'
    },
    {
    title: 'Tiny Love',
        audioSrc: 'tiny love.mp3',
        imageSrc: 'khung20.gif'
    },
    {
    title: 'Heart on the Table',
        audioSrc: 'đặt trái tim lên bàn.mp3',
        imageSrc: 'khung14.gif'
    },
    {
    title: 'Tick-Tack',
        audioSrc: 'Tick-Tack.mp3',
        imageSrc: 'khung22.gif'
    },
    {
    title: 'Hop on da Show',
        audioSrc: 'Hop on da show.mp3',
        imageSrc: 'khung17.gif'
    },
    {
    title: 'Dreamland',
        audioSrc: 'Miền mộng mị.mp3',
        imageSrc: 'khung16.gif'
    },
    {
    title: 'Just Another Lovely Day',
        audioSrc: 'Một ngày chẳng nắng.mp3',
        imageSrc: 'khung19.gif'
    },
    {
    title: 'Dead Inside You',
        audioSrc: 'Chết trong em.mp3',
        imageSrc: 'khung11.gif'
    },
    






];

function loadSongWithSlide(index, direction = 'next') {
    const song = songs[index];
    const frame = document.querySelector('.image-frame');

    const newImg = document.createElement('img');
    newImg.src = song.imageSrc;
    newImg.style.position = 'absolute';
    newImg.style.top = '0';
    newImg.style.left = '0';
    newImg.style.width = '100%';
    newImg.style.height = '100%';
    newImg.style.objectFit = 'cover';
    newImg.style.borderRadius = '30px';
    newImg.style.transition = 'transform 0.6s ease, opacity 0.6s ease';

    // Thiết lập hiệu ứng slide theo hướng
    if (direction === 'next') {
        newImg.classList.add('slide-right');
        songImage.classList.add('slide-left');
    } else {
        newImg.classList.add('slide-in-left');
        songImage.classList.add('slide-out-right');
    }

    frame.appendChild(newImg);

    setTimeout(() => {
        newImg.classList.remove('slide-right', 'slide-in-left');
        newImg.classList.add('slide-in');
    }, 50);

    setTimeout(() => {
        frame.removeChild(songImage);
        newImg.id = 'song-image';
        songImage = newImg;
    }, 650);

    function typeWriter(text, element, speed = 60) {
        element.textContent = ''; // Xóa nội dung cũ
        let i = 0;
        const interval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) clearInterval(interval);
        }, speed);
    }

    typeWriter(song.title, songTitle);

    audioPlayer.src = song.audioSrc;
    if (isPlaying) {
        audioPlayer.play();
    }
}


playButton.addEventListener('click', function () {
    if (!isPlaying) {
        audioPlayer.play();
        playIcon.src = pauseImage;
    } else {
        audioPlayer.pause();
        playIcon.src = playImage;
    }
    isPlaying = !isPlaying;
});

nextButton.addEventListener('click', function () {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadSongWithSlide(currentSongIndex, 'next');
});

prevButton.addEventListener('click', function () {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSongWithSlide(currentSongIndex, 'prev');
});


audioPlayer.addEventListener('ended', function () {
    isPlaying = false;
    playIcon.src = playImage;

    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
});
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Cập nhật thanh tiến trình mỗi khi nhạc chạy
audioPlayer.addEventListener('timeupdate', () => {
    const current = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    if (!isNaN(duration)) {
        progressBar.max = Math.floor(duration);
        progressBar.value = Math.floor(current);

        currentTimeEl.textContent = formatTime(current);
        durationEl.textContent = formatTime(duration);

        updateProgressBarColor(current, duration);
    }
});

// Tua bài hát khi kéo thanh tiến trình
progressBar.addEventListener('input', () => {
    audioPlayer.currentTime = progressBar.value;
    updateProgressBarColor(progressBar.value, progressBar.max);
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgressBarColor(value, max) {
    const percent = (value / max) * 100;
    progressBar.style.background = `linear-gradient(to right, #cb4cfb 0%, #cb4cfb ${percent}%, #ddd ${percent}%, #ddd 100%)`;
}
