const popupEditProfile = document.querySelector('.popup_edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit-button');

const popupFullskrinImage = document.querySelector('.popup_fullskrin');
const imageFullskrin = popupFullskrinImage.querySelector('.popup__image');
const titleImg = popupFullskrinImage.querySelector('.popup__img-text');

const popupNewCard = document.querySelector('.popup_new-card');
const buttonNewCard = document.querySelector('.profile__add-button');

const closeButton = document.querySelectorAll('.popup__close-button');

const elementForm = document.querySelector('.popup__form_new-card');
const inputNameCard = elementForm.querySelector('.input_name-card');
const inputUrlCard = elementForm.querySelector('.input_url');

const profileName = document.querySelector('.profile__name');
const inputProfileName = document.querySelector('.input_profile-name');

const profileSubtitle = document.querySelector('.profile__subtitle');
const inputProfileSubtitle = document.querySelector('.input_profile-subtitle');


function openEditProfile() {
    openPopup(popupEditProfile);
    inputProfileName.value = profileName.textContent;
    inputProfileSubtitle.value = profileSubtitle.textContent;
    enableValidation()
};

function submitProfile(event) {
    event.preventDefault();
    profileName.textContent = inputProfileName.value;
    profileSubtitle.textContent = inputProfileSubtitle.value;
    closePopup();
};


function openImgFullskrin(item) {
    openPopup(popupFullskrinImage);
    imageFullskrin.src = item.src;
    imageFullskrin.alt = item.alt;
    titleImg.textContent = item.alt;
};

function openNewCard() {
    openPopup(popupNewCard);
    inputNameCard.value = '';
    inputUrlCard.value = '';
};

function paintLike(item) {
    item.classList.toggle('element__button_painted');
};


function handleFormSubmit(event) {
    event.preventDefault();
    const newCard = createElement(inputNameCard.value, inputUrlCard.value);
    itemSection.prepend(newCard);
    elementForm.reset();
    enableValidation()
};


popupEditProfile.addEventListener('submit', submitProfile);

elementForm.addEventListener('submit', handleFormSubmit);


closeButton.forEach(button => button.addEventListener('click', closePopup));


buttonEditProfile.addEventListener('click', openEditProfile);
buttonNewCard.addEventListener('click', openNewCard);

enableValidation()