import Card from "../components/card.js";
import FormValidator from "../components/formValidator.js"

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData= {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
}

const card = new Card(cardData, "#card-template");
card.getView();

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profilename = document.querySelector(".profile__title");
const profiledescription = document.querySelector(".profile__description");
const cardsWrap = document.querySelector(".cards__list");
const profileInputTilte = document.querySelector("#profile-title-input");
const profileInputDescription = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.forms["edit-form"];

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const cardAddbutton = document.querySelector(".profile__add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddForm = document.forms["card-form"];

//const AddformEl = cardAddForm.querySelector(".modal__form");
//const EditformEl = profileEditForm.querySelector(".modal__form");

const formValidationOptions={
  formSelector: ".modal__form",
inputSelector: ".modal__input",
inputErrorClass: ".modal__error-text-visible",
errorClass: ".modal__error",
submitButtonSelector: ".modal__button",
inactiveButtonClass: "modal__button_disabled",
}

const addFormValidator = new FormValidator(formValidationOptions, cardAddForm);
addFormValidator._enableValidation();

const editFormValidator = new FormValidator(formValidationOptions, profileEditForm );
editFormValidator._enableValidation();

const previewImageModal = document.querySelector("#preview-modal");
const cardModalCaption = document.querySelector(".modal__caption");
const cardPreviewImage = document.querySelector(".modal__image");

const addNewInput = document.querySelector("#profile-input");
const addNewImage = document.querySelector("#profile-input-url");



function openPopup(pop) {
  pop.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
  pop.addEventListener("mousedown", closeOverlay);
}
function closePopup(pop) {
  pop.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
  pop.removeEventListener("mousedown", closeOverlay);
}

function closeOverlay(e) {
  if (e.target.classList.contains("modal_opened")) {
    closePopup(e.target);
  }
}

function closeModalEsc(e) {
  if (e.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closePopup(modalOpened);
  }
}

function getcardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", ()=>{
  likeButton.classList.toggle("card__like-button_active")
  });
  deleteButton.addEventListener("click", ()=>{
    const cardToDelete = deleteButton.closest(".card");
    if (cardToDelete) {
      cardToDelete.remove();
    }
  });
  cardImageEl.addEventListener("click", (e) => {
    e.preventDefault();
    cardPreviewImage.src = cardData.link;
    cardPreviewImage.alt = cardData.name;
    cardModalCaption.textContent = cardData.name;
    openPopup(previewImageModal);
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

//const handleLikeIcon=(e)=>{
  //e.target.classList.toggle("card__like-button_active");
//}
//const handleDeleteCard=(e)=>{
  //const cardToDelete = e.target.closest(".card");
    //if (cardToDelete) {
      //cardToDelete.remove();
    //}
//}
profileEditButton.addEventListener("click", () => {
  profileInputTilte.value = profilename.textContent;
  profileInputDescription.value = profiledescription.textContent;
  openPopup(profileEditModal);
});

const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profilename.textContent = profileInputTilte.value;
  profiledescription.textContent = profileInputDescription.value;
  closePopup(profileEditModal);
});

cardAddbutton.addEventListener("click", (e) => {
  e.preventDefault();
  openPopup(cardAddModal);
});

cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputCard = { name: addNewInput.value, link: addNewImage.value };
  rendercard(inputCard, cardListEl);
  e.target.reset();
  closePopup(cardAddModal);
});

function rendercard(cardData, wrapper) {
  const cardElement = getcardElement(cardData);

  wrapper.prepend(cardElement);
}
initialCards.forEach((cardData) => rendercard(cardData, cardsWrap));
