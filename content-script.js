const muteAds = () => {
    const videoElement = document.getElementById("player_video_elem");
    if (!videoElement) return;

    if (isAdPlaying()) {
        console.log("muting");
        previousVolume = videoElement.volume;
        videoElement.muted = true;
    } else {
        console.log("unmuting");
        if (videoElement.muted) {
            videoElement.muted = false;
        }
        videoElement.volume = 1.0; // Restore previous volume or default to 1
    }
};

const isAdPlaying = () => {
    const adTagElement = document.getElementsByClassName("mui-style-5kj990-adTag");
    return !!adTagElement && adTagElement.length > 0 && adTagElement.item(0).innerHTML === 'AD';
}

const isAdVideo = (video) => {
    return video.duration < 30 || video.classList.contains("ad-video");
};

let previousVolume = 1;

setInterval(muteAds, 1000);