import { itemSection } from "./data.js";
import { imageFullskrin } from "./data.js";
import { titleImg } from "./data.js";
import { popupFullskrinImage } from "./data.js";
import { openPopup } from "./modal.js";
import { getCardsApi } from "./api.js";
import { deleteCardFromServer } from "./api.js";
const templateElement = document.getElementById('elementTemplate').content.querySelector('.element');
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

export function createElement(name, link, userId, item) {
    const elementCard = templateElement.cloneNode(true);
    const textElement = elementCard.querySelector('.element__text');
    const imgElement = elementCard.querySelector('.element__img');
    const likeCount = elementCard.querySelector('.element__like-counter');
    textElement.textContent = name;
    imgElement.src = link;
    imgElement.alt = name;
    imgElement.id = userId;

    const likeButton = elementCard.querySelector('.element__button');
    const deleteButton = elementCard.querySelector('.element__delete-button');
    addDeleteButton(userId, item.owner._id, deleteButton, item._id)
    likeButton.addEventListener('click', () => paintLike(likeButton));
    imgElement.addEventListener('click', () => openImgFullskrin(imgElement));



    return elementCard;
};

function addDeleteButton(userId, ownerID, deleteButton, cardId) {
    if (userId !== ownerID) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', () => deleteCardFromServer(cardId));
    }
}


function paintLike(item) {
    item.classList.toggle('element__button_painted');
};

function openImgFullskrin(item) {
    openPopup(popupFullskrinImage);
    imageFullskrin.src = item.src;
    imageFullskrin.alt = item.alt;
    titleImg.textContent = item.alt;
};