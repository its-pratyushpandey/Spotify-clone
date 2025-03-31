console.log("Welcome to Spotify Clone");

// Variables
let songIndex = 0;
let audioElement = new Audio();
let playPause = document.getElementById("playPause");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let currentSongName = document.getElementById("currentSongName");
let songItemContainer = document.querySelector(".songItemContainer");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");

// Songs List
let songs = [
    { songName: "Warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji - Heroes Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" }
];

// Load Songs into UI
songs.forEach((song, index) => {
    let songItem = document.createElement("div");
    songItem.classList.add("songItem");
    songItem.innerHTML = `
        <img src="${song.coverPath}" alt="Cover">
        <span>${song.songName}</span>
    `;
    songItem.addEventListener("click", () => playSong(index));
    songItemContainer.appendChild(songItem);
});

// Play Song
const playSong = (index) => {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    currentSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    playPause.classList.replace("fa-play-circle", "fa-pause-circle");
    gif.style.opacity = 1;
};

// Toggle Play/Pause
playPause.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        playPause.classList.replace("fa-play-circle", "fa-pause-circle");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        playPause.classList.replace("fa-pause-circle", "fa-play-circle");
        gif.style.opacity = 0;
    }
});

// Update Progress Bar
audioElement.addEventListener("timeupdate", () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.value = progress;
});

// Seek Song
progressBar.addEventListener("input", () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// Next and Previous Song
nextBtn.addEventListener("click", () => playSong((songIndex + 1) % songs.length));
prevBtn.addEventListener("click", () => playSong((songIndex - 1 + songs.length) % songs.length));

// Auto Play Next Song on End
audioElement.addEventListener("ended", () => nextBtn.click());

// Keyboard Shortcuts
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        playPause.click();
    } else if (e.code === "ArrowRight") {
        nextBtn.click();
    } else if (e.code === "ArrowLeft") {
        prevBtn.click();
    }
});
