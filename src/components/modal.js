function openPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
    item.addEventListener('click', closeByOverlay);
};

function closePopup() {    
    const popupOpen = document.querySelector('.popup_opened');
    popupOpen.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
};

function handleDeleteCard(item) {
    item.remove();
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