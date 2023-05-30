const itemSection = document.querySelector('.elements');
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

export function createElement(name, link) {
    const elementCard = templateElement.cloneNode(true);
    const textElement = elementCard.querySelector('.element__text');
    const imgElement = elementCard.querySelector('.element__img');
    textElement.textContent = name;
    imgElement.src = link;
    imgElement.alt = name;

    const likeButton = elementCard.querySelector('.element__button');
    const deleteButton = elementCard.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', () => handleDeleteCard(elementCard));
    likeButton.addEventListener('click', () => paintLike(likeButton));
    imgElement.addEventListener('click', () => openImgFullskrin(imgElement));



    return elementCard;
};

initialCards.forEach((item) => {
    const newCard = createElement(item.name, item.link);
    itemSection.append(newCard);
});

function handleDeleteCard(item) {
    item.remove();
};

function paintLike(item) {
    item.classList.toggle('element__button_painted');
};

function openImgFullskrin(item) {
    openPopup(popupFullskrinImage);
    imageFullskrin.src = item.src;
    imageFullskrin.alt = item.alt;
    titleImg.textContent = item.alt;
};