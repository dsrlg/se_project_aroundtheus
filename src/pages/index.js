import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  selectors,
  formValidationOptions,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const profileDescription = document.querySelector(selectors.profileDescription);
const profileTitle = document.querySelector(selectors.profileTitle);

// UserInfo
const userInfoData = new UserInfo({
  userNameSelector: ".profile__title",
  userDescriptionSelector: ".profile__description",
});
const cardPreviewImage = new PopupWithImage(selectors.previewpopup);
cardPreviewImage.setEventListners();

const userInfoPopup = new PopupWithForm(selectors.profileEditModal, (data) => {
  userInfoData.setUserInfo({
    name: data.title,
    description: data.description,
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
    //validator._setEventListeners();
    validator.enableValidation();
  });
};

enableValidation(formValidationOptions);

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardSection.addItems(createCard({ name: data.name, link: data.link }));
    },
  },
  selectors.cardSection
);

function handleImageClick(data) {
  cardPreviewImage.open(data);
}

cardSection.renderItems();

const newcardPopup = new PopupWithForm(selectors.newCardModal, (cardData) => {
  cardSection.addItems(createCard({ name: cardData.title, link: cardData.url }));
  newcardPopup.close();
  formValidators["card-form"].disableButton();
});

newcardPopup.setEventListners();
document
  .querySelector(selectors.addProfilebutton)
  .addEventListener("click", () => newcardPopup.open());

function createCard({ name, link }) {
  const card = new Card(
    {
      name: name,
      link: link,
    },
    handleImageClick,
    selectors.cardTemplate
  );
  return card.getView();
}
