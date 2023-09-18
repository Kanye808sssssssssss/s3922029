
let audioElement = document.getElementById("audioElement");

let playButton = document.getElementById("playButton");
let stopButton = document.getElementById("stopButton");
let muteButton = document.getElementById("muteButton");
let fullScreenButton = document.getElementById("fullScreenButton");
// the progress element
let progressBar = document.getElementById("progressBar");
// the hero image
let heroImage = document.getElementById("heroImage");


audioElement.removeAttribute("controls");

document.getElementById("controlsWrapper").style.display = "flex";


audioElement.addEventListener('loadedmetadata', () => {
	progressBar.setAttribute('max', audioElement.duration);
});


audioElement.addEventListener("playing", () => {
	
	if(!progressBar.getAttribute('max')) {
		progressBar.setAttribute('max', audioElement.duration);
	}
});


audioElement.addEventListener("waiting", () => {
	progressBar.classList.add("timeline-loading");
});
audioElement.addEventListener("canplay", () => {
	progressBar.classList.remove("timeline-loading");
});

/* MEDIA FINSIHED */

//
audioElement.addEventListener("ended", () => {
	playButton.style.backgroundImage = "url('./icons/play.svg')";
});

/* PLAY/PAUSE */


function playPause() {
	
	if(audioElement.paused || audioElement.ended) {
		
		audioElement.play();
		
		playButton.style.backgroundImage = "url('./icons/pause.svg')";
	} else {
		
		audioElement.pause();
		
		playButton.style.backgroundImage = "url('./icons/play.svg')";
	}
}
//Define a function to implement switching audio
function muteAudio() {
	if(audioElement.muted) {
		//Replace the sound button background
		muteButton.style.backgroundImage = "url('./icons/mute.svg')";
	} else {
		//Replace the sound button background
		muteButton.style.backgroundImage = "url('./icons/unmute.svg')";
	}
	//Changing the sound status
	audioElement.muted = !audioElement.muted;

}
//Define a function to control the video full screen playback
function fullScreen() {
	if(audioElement.requestFullscreen) {
		audioElement.requestFullscreen();
	} else if(audioElement.mozRequestFullScreen) { // Firefox
		audioElement.mozRequestFullScreen();
	} else if(audioElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
		audioElement.webkitRequestFullscreen();
	} else if(audioElement.msRequestFullscreen) { // IE/Edge
		audioElement.msRequestFullscreen();
	}

}

playButton.addEventListener('click', playPause);
//Monitor Sound Button
muteButton.addEventListener('click', muteAudio);
//Listen to the full screen play button
fullScreenButton.addEventListener('click', fullScreen);

heroImage.addEventListener('click', playPause);


audioElement.addEventListener('timeupdate', () => {
	
	progressBar.value = audioElement.currentTime;
});


function scrubToTime(e) {
	
	let x = e.clientX - (progressBar.getBoundingClientRect().left + window.scrollX);
	audioElement.currentTime = clampZeroOne(x / progressBar.offsetWidth) * audioElement.duration;
}



progressBar.addEventListener('mousedown', scrubToTime);
progressBar.addEventListener('mousedown', (e) => {
	
	
	window.addEventListener('mousemove', scrubToTime);
	window.addEventListener('mouseup', () => {
		window.removeEventListener('mousemove', scrubToTime);
	});
});

/* HELPER FUNCTIONS */

function clampZeroOne(input) {
	return Math.min(Math.max(input, 0), 1);
}

function logEvent(e) {
	console.log(e);
}