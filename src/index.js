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
} from "./components/data";

import { enableValidation } from "./components/validate";

import { createElement } from "./components/card";

import { openPopup } from "./components/modal";

import { closePopup } from "./components/modal";

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
    enableValidation()
};


popupEditProfile.addEventListener('submit', submitProfile);

elementForm.addEventListener('submit', handleFormSubmit);


closeButton.forEach(button => button.addEventListener('click', closePopup));


buttonEditProfile.addEventListener('click', openEditProfile);
buttonNewCard.addEventListener('click', openNewCard);

enableValidation()