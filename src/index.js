import './pages/index.css';
import {
    popupEditProfile,
    buttonEditProfile,
    popupFullskrinImage,
    imageFullskrin,
    titleImg,
    popupNewCard,
    buttonNewCard,
    closeButton,
    elementForm,
    inputNameCard,
    inputUrlCard,
    profileName,
    inputProfileName,
    profileSubtitle,
    inputProfileSubtitle
} from "./components/data.js";
import { itemSection } from './components/data.js';
import { validSettings } from './components/data.js';

import { enableValidation } from "./components/validate.js";

import { createElement } from "./components/card.js";

import { openPopup } from "./components/modal.js";
import { closePopup } from "./components/modal.js";

import { loadingProfile } from './components/api.js';
import { getCardsApi } from './components/api.js';



let userId

function openEditProfile() {
    openPopup(popupEditProfile);
    inputProfileName.value = profileName.textContent;
    inputProfileSubtitle.value = profileSubtitle.textContent;
};

function submitProfile(event) {
    event.preventDefault();
    profileName.textContent = inputProfileName.value;
    profileSubtitle.textContent = inputProfileSubtitle.value;
    closePopup();
};



function openNewCard() {
    openPopup(popupNewCard);
    inputNameCard.value = '';
    inputUrlCard.value = '';
};


function handleFormSubmit(event) {
    event.preventDefault();
    const newCard = createElement(inputNameCard.value, inputUrlCard.value);
    itemSection.prepend(newCard);
    elementForm.reset();
    closePopup()
};


Promise.all([loadingProfile(), getCardsApi()])
    .then(([userData, allCards]) => {
        userId = userData._id;
        profileName.textContent = userData.name;
        profileSubtitle.textContent = userData.about;
        //profileAvatar.src = userData.avatar;
        //prosileAvatar.alt = userData.name;

        allCards.forEach((item) => {
            const newCard = createElement(item.name, item.link, userId, item);
            itemSection.append(newCard);
        });
    })


popupEditProfile.addEventListener('submit', submitProfile);

elementForm.addEventListener('submit', handleFormSubmit);


closeButton.forEach(button => button.addEventListener('click', closePopup));


buttonEditProfile.addEventListener('click', openEditProfile);
buttonNewCard.addEventListener('click', openNewCard);

enableValidation(validSettings)