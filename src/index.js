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
    inputProfileSubtitle,
    popupEditAvatar,
    buttonEditAvatar,
    itemSection,
    validSettings,
    inputAvatarUrl,
    profileAvatar,
    avatarForm,
} from "./components/data.js";

import { enableValidation } from "./components/validate.js";

import { createElement } from "./components/card.js";

import { openPopup } from "./components/modal.js";
import { closePopup } from "./components/modal.js";

import { loadingProfile } from './components/api.js';
import { getCardsApi } from './components/api.js';
import { changeAvatar } from './components/api.js';
import { changeProfile } from './components/api.js';
import { addCardFromServer } from './components/api.js';



let userId

function openEditProfile() {
    openPopup(popupEditProfile);
    inputProfileName.value = profileName.textContent;
    inputProfileSubtitle.value = profileSubtitle.textContent;
};

function submitProfile(event) {
    event.preventDefault();
    event.submitter.textContent = 'Сохранение...'
    changeProfile(inputProfileName.value, inputProfileSubtitle.value)
    .then((res) => {
        profileName.textContent = res.name,
        profileSubtitle.textContent = res.about;
    })
    closePopup()
    .catch(e => console.log(e))
    .finally(() => {
        event.submitter.textContent = 'Сохранить'
    })
};



function openNewCard() {
    openPopup(popupNewCard);
    inputNameCard.value = '';
    inputUrlCard.value = '';
};


function handleFormSubmit(event) {
    event.preventDefault();
    event.submitter.textContent = 'Сохранение...'
    addCardFromServer(inputNameCard.value, inputUrlCard.value)
    .then((res) =>{
      const newCard =  createElement(res.name, res.link, res._id, res);
      itemSection.prepend(newCard);
    })
    .catch(e => console.log(e))
    .finally(() => {
        event.submitter.textContent = 'Сохранить'
    })

    elementForm.reset();
    closePopup()
};

function handleSubmitAvatarForm(event) {
    event.preventDefault();
    event.submitter.textContent = 'Сохранение...'
    changeAvatar(inputAvatarUrl.value)
        .then((res) => {
            profileAvatar.src = res.avatar;
            closePopup()            
        })
        .catch(e => console.log(e))
        .finally(() => {
            event.submitter.textContent = 'Сохранить'
        })

}

function openEditAvatar() {
    avatarForm.reset()
    openPopup(popupEditAvatar)
}


Promise.all([loadingProfile(), getCardsApi()])
    .then(([userData, allCards]) => {
        userId = userData._id;
        profileName.textContent = userData.name;
        profileSubtitle.textContent = userData.about;
        profileAvatar.src = userData.avatar;
        profileAvatar.alt = userData.name;

        allCards.forEach((item) => {
            const newCard = createElement(item.name, item.link, userId, item);
            itemSection.append(newCard);
        });
    })
    .catch(e => console.log(e))
    
    


popupEditProfile.addEventListener('submit', submitProfile);

elementForm.addEventListener('submit', handleFormSubmit);

popupEditAvatar.addEventListener('submit', handleSubmitAvatarForm);


closeButton.forEach(button => button.addEventListener('click', closePopup));

buttonEditAvatar.addEventListener('click', openEditAvatar);
buttonEditProfile.addEventListener('click', openEditProfile);
buttonNewCard.addEventListener('click', openNewCard);

enableValidation(validSettings)