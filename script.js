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
    }
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
