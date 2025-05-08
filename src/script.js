function openPopUp() {
    popUp = document.querySelector('.info-pop-up');
    popUp.style.opacity = "1";
    popUp.style.zIndex = "999"
}
function closePopUp() {
    popUp = document.querySelector('.info-pop-up');
    popUp.style.opacity = "0";
    popUp.style.zIndex = "-1"
}

function openPopUpVideo() {
    const popUpVideo = document.querySelector('.pop-up-video');
    popUpVideo.style.opacity = "1";
    popUpVideo.style.zIndex = "999";
}

function closePopUpVideo() {
    const popUpVideo = document.querySelector('.pop-up-video');
    popUpVideo.style.opacity = "0";
    popUpVideo.style.zIndex = "-1";
}
