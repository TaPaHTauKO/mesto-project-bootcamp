export function openPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
    item.addEventListener('click', closeByOverlay);
};

export function closePopup() {
    const popupOpen = document.querySelector('.popup_opened');
    if (typeof(popupOpen) != 'undefined' && popupOpen != null) {
    popupOpen.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
    popupOpen.removeEventListener('click', closeByOverlay);
}
};


function closeByEsc(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
}

function closeByOverlay(e) {
    if (e.target.classList.contains('popup_opened')) {
        closePopup();
    };
}