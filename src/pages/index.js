import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, selectors } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import userInfo from "../components/UserInfo.js";

const profileDescription = document.querySelector(selectors.profileDescription);
const profileTitle = document.querySelector(selectors.profileTitle);


// UserInfo
const userInfoData = new userInfo({
  userNameSelector: ".profile__title",
  userDescriptionSelector: ".profile__description",
});
const cardPreviewImage = new PopupWithImage(selectors.previewpopup);
cardPreviewImage.setEventListners();

// const popupWithImage = new PopupWithImage(selectors.previewpopup);
// popupWithImage.setEventListners();

const userInfoPopup = new PopupWithForm(selectors.profileEditModal, (data) => {
  userInfoData.setUserInfo({
    name: data.name,
    description: data.description
  });
  userInfoPopup.close();
});
userInfoPopup.setEventListners();

document
  .querySelector(selectors.editProfilebutton)
  .addEventListener("click", () => {
    const currentUserInfo = userInfoData.getUserInfo();
    profileTitle.value = currentUserInfo.name;
    profileDescription.value = currentUserInfo.description;
    userInfoPopup.open();
  });


// define an object for storing validators
const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
const formValidationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  inputErrorClass: ".modal__error-text-visible",
  errorClass: ".modal__error",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
};
enableValidation(formValidationOptions);

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardE1 = new Card(
        { name: data.name, link: data.link },
        handleImageClick,
        selectors.cardTemplate
      );
      cardSection.addItems(cardE1.getView());
    },
  },
  selectors.cardSection
);

function handleImageClick(data) {
  cardPreviewImage.open(data);
}


cardSection.renderItems();

const newcardPopup = new PopupWithForm(selectors.newCardModal, (cardData) => {
  const card = new card({
    name: cardData.name,link:cardData.link},
     (cardData) => {
      cardPreviewImage.open(cardData);
    },
    selectors.cardTemplate
  );
  
  cardSection.addItems(card.generateCard());
  newcardPopup.close();
   //addFormValidator.disableButton();
});

newcardPopup.setEventListners();
document.querySelector(selectors.addProfilebutton).addEventListener("click", () => newcardPopup.open());

