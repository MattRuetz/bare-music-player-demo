const mainHeading = document.querySelector('h1');
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const getGradientLeftHex = () =>
    document.documentElement.style.getPropertyValue('--gradient-color-left');
const setGradientLeftHex = (newVal) =>
    document.documentElement.style.setProperty('--gradient-color-left', newVal);

const getGradientRightHex = () =>
    document.documentElement.style.getPropertyValue('--gradient-color-right');
const setGradientRightHex = (newVal) =>
    document.documentElement.style.setProperty(
        '--gradient-color-right',
        newVal
    );

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// current playing song index
let songIndex = 2;

let avgBackgroundHex = '';

const loadSong = (song) => {
    title.textContent = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
};

const playSong = () => {
    musicContainer.classList.add('play');
    playBtn
        .querySelector('i.fa-solid')
        .classList.replace('fa-play', 'fa-pause');

    audio.play();
};

const pauseSong = () => {
    musicContainer.classList.remove('play');
    playBtn
        .querySelector('i.fa-solid')
        .classList.replace('fa-pause', 'fa-play');

    audio.pause();
};

const setRandomGradient = () => {
    setGradientLeftHex(getRandomHexColor());
    setGradientRightHex(getRandomHexColor());
};

const getRandomHexColor = () => {
    // yoinked from : https://www.tutorialspoint.com/generating-random-hex-color-in-javascript
    let color = '#';
    for (let i = 0; i < 6; i++) {
        const random = Math.random();
        const bit = (random * 16) | 0;
        color += bit.toString(16);
    }
    return color;
};

// Finds an appropriate heading color (black or white) to contrast random background
const chooseHeadingColor = () => {
    // from: https://stackoverflow.com/questions/52641718/get-average-of-two-hex-colors-returning-same-result
    color1 = getGradientLeftHex();
    color2 = getGradientRightHex();

    var avg = function (a, b) {
            return (a + b) / 2;
        },
        t16 = function (c) {
            return parseInt(('' + c).replace('#', ''), 16);
        },
        hex = function (c) {
            var t = (c >> 0).toString(16);
            return t.length == 2 ? t : '0' + t;
        },
        hex1 = t16(color1),
        hex2 = t16(color2),
        r = function (hex) {
            return (hex >> 16) & 0xff;
        },
        g = function (hex) {
            return (hex >> 8) & 0xff;
        },
        b = function (hex) {
            return hex & 0xff;
        },
        res =
            '#' +
            hex(avg(r(hex1), r(hex2))) +
            hex(avg(g(hex1), g(hex2))) +
            hex(avg(b(hex1), b(hex2)));
    if (res < '#888888') {
        mainHeading.style.color = 'white';
    } else {
        mainHeading.style.color = 'black';
    }
};

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// On load
loadSong(songs[songIndex]);
setRandomGradient();
chooseHeadingColor();
