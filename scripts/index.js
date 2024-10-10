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

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profilename = document.querySelector(".profile__title");
const profiledescription = document.querySelector(".profile__description");
const cardsWrap = document.querySelector(".cards__list");
const profileInputTilte = document.querySelector("#profile-title-input");
const profileInputDescription = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileAddForm = profileAddModal.querySelector(".modal__form");
  
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  profileAddModal.classList.remove("modal_opened");
}

function getcardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
   //likeButton.forEach((likeButton) => {
    likeButton.addEventListener("click", () => {
      console.log("t")
      likeButton.classList.toggle(".card__like-button_active");
    });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  profileInputTilte.value = profilename.textContent;
  profileInputDescription.value = profiledescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

const profileCloseButton = document.querySelector("#profile-modal-close");
profileCloseButton.addEventListener("click", () => {
  closePopup();
});

const profileAddCloseButton = document.querySelector("#add-modal-close");
profileAddCloseButton.addEventListener("click", () => {
  closePopup();
});


profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profilename.textContent = profileInputTilte.value;
  profiledescription.textContent = profileInputDescription.value;
  closePopup();
});


profileAddButton.addEventListener("click", ()=> {
  profileAddModal.classList.add("modal_opened");
});

profileAddForm.addEventListener("submit", () =>{
  closePopup();
});

// initialCards.forEach((cardData) => {
//   const cardElement = getcardElement(cardData);
//   cardListEl.append(cardElement);
// });

// profileAddButton.addEventListener("click", ()=>   openModal(addCardModal));
// addCardModalCloseButton.addEventListener("click", () => closeModal(addCardModal))
function rendercard(cardData,wrapper){
  const cardElement = getcardElement(cardData);
  wrapper.prepend(cardElement)
}
initialCards.forEach((cardData)=> rendercard(cardData, cardsWrap));

//delete button
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  console.log(cardElement); // Log to check the cloned element

  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button"); // Updated line
  
  console.log(cardDeleteButton); // Log to check if the delete button is found
  
  if (!cardDeleteButton) {
    console.error("cardDeleteButton not found");
    return; // Exit the function if the delete button is not found
  }

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  // Add the event listener for the delete button within the scope of the card
  cardDeleteButton.addEventListener("click", () => {
    console.log("Delete button clicked"); // For debugging
    const cardToDelete = cardDeleteButton.closest(".card");
    if (cardToDelete) {
      console.log("Card found and will be deleted"); // For debugging
      cardToDelete.remove();
    } else {
      console.log("Card not found"); // For debugging
    }
  });

  return cardElement;
}
