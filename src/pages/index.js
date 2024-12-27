import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, selectors } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import userInfo  from "../components/UserInfo.js";

const editCardPopup = new PopupWithForm("#profile-edit-modal", () => {});
const addCardPopup = new PopupWithForm("#card-add-modal", () => {});
const formValidationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  inputErrorClass: ".modal__error-text-visible",
  errorClass: ".modal__error",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
};


// UserInfo
const userInfoData = new userInfo({
usernameSelector:".profile__title",
userDescriptionSelector: ".profile__description",
});

function handleProfileEditSubmit(inputData){
  userInfoData.setUserInfo({
    name:inputData.name,
    description : inputData.description,
  });
}
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

const cardPreviewImage = new PopupWithImage(selectors.previewpopup);
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardE1 = new Card(
        {name : data.name,
         link : data.link,
        },
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

cardPreviewImage.setEventListners();
enableValidation(formValidationOptions);

addCardPopup.open();
addCardPopup.close();
editCardPopup.open();
editCardPopup.close();
cardSection.renderItems();
