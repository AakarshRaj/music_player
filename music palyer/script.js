let songIndex = 0;
const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const title = document.getElementById("title");
const backward = document.getElementById("backward");
const forward = document.getElementById("forward");


let progress = document.getElementById("progress");
let progress_div = document.getElementById("progress_div");
let durationn = document.getElementById("duration");
let current_time = document.getElementById("current_time");

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
    // play.classList.replace('fa-play', 'fa-pause');
    img.classList.add("imgrotate");
    // music.playbackRate = 4;
    play.src="pause.png";
};

// for pause function 
const pauseMusic = () => {
    isplaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    img.classList.remove("imgrotate");
    play.src="play.png";
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

// loadSongs(songs[2]);

const forwardSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
};

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
}

// progress js work 

music.addEventListener("timeupdate", () => {

    // const { currentTime, duration} = event.srcElement;
   let currentTime = music.currentTime;
    const duration = music.duration;


    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    // music duration update 

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);



    let tot_duration = `${min_duration}:${sec_duration}`;
    if (duration) {
        durationn.textContent = `${tot_duration}`;
    }

    // music current time update   

    let min_current_time = Math.floor(currentTime / 60);
    let sec_current_time = Math.floor(currentTime % 60);

    if (sec_current_time < 10) {
        sec_current_time = `0${sec_current_time}`;
    }

    let tot_current_time = `${min_current_time}:${sec_current_time}`;
    current_time.textContent = `${tot_current_time}`;


    progress_div.addEventListener("click", (event) => {
        // let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;  
        // the above line of code was not functioning properly because clientwidth was changing so i changed it with 250      
        let move_progress = (event.offsetX / 250) * duration;
        music.currentTime = move_progress;
        console.log(music.currentTime);
    })
})

forward.addEventListener("click", forwardSong);
backward.addEventListener('click', prevSong);
music.onended = forwardSong;
