const shouldMuteAd = (isAdPlaying, currentVolume, isMuted) => {
    return isAdPlaying && currentVolume > 0 && !isMuted;
}

const shouldUnMuteAd = (isAdPlaying, isMutedByExtension) => {
    return !isAdPlaying && isMutedByExtension;
}

const muteAds = () => {
    const videoElement = document.getElementById("player_video_elem");
    if (!videoElement) return;

    const currentVolume = videoElement.volume;
    const isMuted = !!videoElement.muted;
    const isAdPlaying = isPlayingAd();

    if (shouldMuteAd(isAdPlaying, currentVolume, isMuted)) {
        console.log("muting");
        previousVolume = videoElement.volume;
        videoElement.muted = true;
        isMutedByExtension = true;
    }


    if (shouldUnMuteAd(isAdPlaying, isMutedByExtension)) {
        console.log("unmuting", isAdPlaying, isMutedByExtension);
        if (videoElement.muted) {
            videoElement.muted = false;
        }
        videoElement.volume = previousVolume || 1.0; // Restore previous volume or default to 1
        isMutedByExtension = false;
    }
};

// const isPlayingAd = () => {
//     // const adTagElement = document.getElementsByClassName("mui-style-5kj990-adTag");
//     const adTagElement = document.getElementsByClassName("mui-style-q6mwaa-controlWrapper");
//     console.log(adTagElement);
//     return adTagElement.length > 0;
//     // return !!adTagElement && adTagElement.length > 0 && adTagElement.item(0).innerHTML === 'AD';
// }

const isPlayingAd = () => {
    const adDivAncestor = document.getElementById("player-wrapper");
    const candidateAdDivElements = adDivAncestor.querySelectorAll("div");
    const adDivList = Array.from(candidateAdDivElements).filter(candidateDiv => {
        const classnames = Array.from(candidateDiv.classList);
        const containsAdClass = classnames.some((className) => /-adTag$/.test(className));

        if (containsAdClass) {
            return candidateDiv.innerHTML === "AD";
        }

        return false;
    });

    return adDivList.length > 0;
}

var previousVolume = 1;
var isMutedByExtension = false;

setInterval(muteAds, 1000);