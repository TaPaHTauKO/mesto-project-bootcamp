const popupEditProfile = document.querySelector('.popup_edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit-button');

const popupFullskrinImage = document.querySelector('.popup_fullskrin');
const imageFullskrin = popupFullskrinImage.querySelector('.popup__image');
const titleImg = popupFullskrinImage.querySelector('.popup__img-text');

const popupNewCard = document.querySelector('.popup_new-card');
const buttonNewCard = document.querySelector('.profile__add-button');

const closeButton = document.querySelectorAll('.popup__close-button');


const templateElement = document.getElementById('elementTemplate').content.querySelector('.element');

const itemSection = document.querySelector('.elements');

const elementForm = document.querySelector('.popup__form_new-card');
const inputNameCard = elementForm.querySelector('.input_name-card');
const inputUrlCard = elementForm.querySelector('.input_url');

const profileName = document.querySelector('.profile__name');
const inputProfileName = document.querySelector('.input_profile-name');

const profileSubtitle = document.querySelector('.profile__subtitle');
const inputProfileSubtitle = document.querySelector('.input_profile-subtitle');


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function openEditProfile() {
    popupEditProfile.classList.toggle('popup_opened');
    inputProfileName.value = profileName.textContent;
    inputProfileSubtitle.value = profileSubtitle.textContent;
};

function submitProfile(event) {
    event.preventDefault();
    profileName.textContent = inputProfileName.value;
    profileSubtitle.textContent = inputProfileSubtitle.value;
    popupEditProfile.classList.remove('popup_opened');
};

function openNewCard() {
    popupNewCard.classList.toggle('popup_opened');
};

function openImgFullskrin(item) {
    popupFullskrinImage.classList.toggle('popup_opened');
    imageFullskrin.src = item.src;
    imageFullskrin.alt = item.alt;
    titleImg.textContent = item.alt;
};

function closePopup(event) {
    event.target.closest('.popup').classList.toggle('popup_opened');

};

function paintedLike(item) {
    item.classList.toggle('element__button_painted');
};

function handleDeleteCard(item) {
    item.remove();
};

function createElement(name, link) {
    const elementCard = templateElement.cloneNode(true);
    const textElement = elementCard.querySelector('.element__text');
    const imgElement = elementCard.querySelector('.element__img');
    textElement.textContent = name;
    imgElement.src = link;
    imgElement.alt = name;

    const likeButton = elementCard.querySelector('.element__button');
    const deleteButton = elementCard.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', () => handleDeleteCard(elementCard));
    likeButton.addEventListener('click', () => paintedLike(likeButton));
    imgElement.addEventListener('click', () => openImgFullskrin(imgElement));


    openNewCard();

    return elementCard;
};

function handleFormSubmit(event) {
    event.preventDefault();
    const newCard = createElement(inputNameCard.value, inputUrlCard.value);
    itemSection.append(newCard);
    elementForm.reset();
};


popupEditProfile.addEventListener('submit', submitProfile);

elementForm.addEventListener('submit', handleFormSubmit);


closeButton.forEach(button => button.addEventListener('click', closePopup));

initialCards.forEach((item) => {
    const newCard = createElement(item.name, item.link);
    itemSection.append(newCard);
})

buttonEditProfile.addEventListener('click', openEditProfile);
buttonNewCard.addEventListener('click', openNewCard);



