const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const title = document.getElementById("title");
const backward = document.getElementById("backward");
const forward = document.getElementById("forward");
let isplaying = false;

// songs object array 

const songs = [
    {
        name: "Alan Walker-Faded",
        title: "Alan Walker",
    },
    {
        name: "Marshmello-Alone",
        title: "Marshmello",
    },
    {
        name: "Sugar & Brownies-Dharia",
        title: "Sugar and Brownies",
    }
];

// for play function 
const playMusic = () => {
    isplaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    img.classList.add("imgrotate");
    // music.playbackRate = 4;
};

// for pause function 
const pauseMusic = () => {
    isplaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    img.classList.remove("imgrotate");
};

play.addEventListener('click', () => {
    if (isplaying) {
        pauseMusic();
    }
    else {
        playMusic()
    }
});

// changing the music Data

const loadSongs = (songs) => { 
    title.textContent = songs.title;
    music.src = "music/" + songs.name + ".mp3";
    img.src = "images/" + songs.name + ".jpg";
};

songIndex = 0;
// loadSongs(songs[2]);

const forwardSong = () => {
    // songIndex++;
    songIndex = (songIndex + 1) % songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
};

const prevSong = () => {
    // songIndex++;
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
}
forward.addEventListener("click", forwardSong);
backward.addEventListener('click', prevSong);
music.onended = forwardSong;