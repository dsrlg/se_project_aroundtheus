import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  selectors,
  formValidationOptions,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupConfirm from "../components/PopupWithConfirm.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
    authToken: "5782927d-9e6f-49bd-bfea-d56552d67f06"
});

const deletePopup = new PopupConfirm('#modal-card-popupdelte', handleConfirmModal, api);  
deletePopup.setEventListners(); 
function handleConfirmModal(id) {
  console.log("id");
  console.log(id);
  api.toDeleteCard(id).then((card) =>{
    this._cardElement.remove()});
}
const profileDescription = document.querySelector(selectors.profileDescription);
const profileTitle = document.querySelector(selectors.profileTitle);

const cardSection = new Section(
     (data) => {
      cardSection.addItems(createCard(data));
    },
  selectors.cardSection
);

// UserInfo
api.getUserInformation();
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

api.getInitialCards()
   .then((initialCards) => {
    cardSection.renderItems(initialCards);
})
.catch((err) => {
  console.error(err);
});

function handleImageClick(data) {
  cardPreviewImage.open(data);
}

const newcardPopup = new PopupWithForm(selectors.newCardModal, (cardData) => {
  cardSection.addItems(createCard({ name: cardData.title, link: cardData.url}));
  newcardPopup.close();
  formValidators["card-form"].disableButton();
});

function createCard(data) {
  const card = new Card(
    data,
    handleImageClick, 
    selectors.cardTemplate,
    deletePopup
  );
  return card.getView();
}

newcardPopup.setEventListners();
document
  .querySelector(selectors.addProfilebutton)
  .addEventListener("click", () => newcardPopup.open());


