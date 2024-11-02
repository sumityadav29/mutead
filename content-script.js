const muteAds = () => {
    const videoElement = document.getElementById("player_video_elem");
    if (!videoElement) return;

    if (isAdPlaying()) {
        previousVolume = videoElement.volume;
        videoElement.muted = true;
    } else {
        videoElement.volume = previousVolume;
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