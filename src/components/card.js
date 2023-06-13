import { itemSection } from "./data.js";
import { imageFullskrin } from "./data.js";
import { titleImg } from "./data.js";
import { popupFullskrinImage } from "./data.js";
import { openPopup } from "./modal.js";
import { getCardsApi } from "./api.js";
import { deleteCardFromServer } from "./api.js";
import { addLikeFromServer } from "./api.js";
import { deleteLikeFromServer } from "./api.js";
const templateElement = document.getElementById('elementTemplate').content.querySelector('.element');


export function createElement(name, link, userId, item) {
    const elementCard = templateElement.cloneNode(true);
    const textElement = elementCard.querySelector('.element__text');
    const imgElement = elementCard.querySelector('.element__img');
    const likeCount = elementCard.querySelector('.element__like-counter');
    const likeButton = elementCard.querySelector('.element__button');
    const deleteButton = elementCard.querySelector('.element__delete-button');
    const cardLikes = item.likes
    textElement.textContent = name;
    imgElement.src = link;
    imgElement.alt = name;
    elementCard.id = item._id;

    addDeleteButton(userId, item.owner._id, deleteButton, item._id)


    likeButton.addEventListener('click', () => paintedLike());


    updateLike(cardLikes, likeButton, userId);


    function isLiked(likesArray, userId) {
        return likesArray.some(item => item._id === userId)
    };

    function updateLike(likesArray, likeButton, userId) {
        likeButton.classList.toggle('element__button_painted', isLiked(likesArray, userId));
        likeCount.textContent = likesArray.length;
    };

    function paintedLike(evt) {
        const queryMetod = likeButton.classList.contains('element__button_painted') ? deleteLikeFromServer(item._id) : addLikeFromServer(item._id);
        queryMetod
            .then(res => {
                updateLike(res.likes, likeButton, userId)

            })
            .catch(e => console.log(e))
    };

    imgElement.addEventListener('click', () => openImgFullskrin(imgElement));



    return elementCard;
};

function addDeleteButton(userId, ownerID, deleteButton, cardId) {
    if (userId !== ownerID) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', () => handleDeleteCard(cardId))
    };
}

function handleDeleteCard(cardId) {
    deleteCardFromServer(cardId)
    .then((res) => {
        const deletingCard = document.getElementById(`${cardId}`)
        deletingCard.remove()
    })
    .catch(e => console.log(e))
}



function openImgFullskrin(item) {
    openPopup(popupFullskrinImage);
    imageFullskrin.src = item.src;
    imageFullskrin.alt = item.alt;
    titleImg.textContent = item.alt;
};