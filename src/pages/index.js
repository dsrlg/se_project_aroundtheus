import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { selectors, formValidationOptions } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupConfirm from "../components/PopupWithConfirm.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authToken: "5782927d-9e6f-49bd-bfea-d56552d67f06",
});

function handleDeleteModal(card) {
  deletePopup.open();
  deletePopup.setSubmitFunction(() => {
    api.toDeleteCard(card._id).then(() => {
      deletePopup.close();
      card.removeCard();
    });
  });
}

function handleLikeButton(card) {
  if (card.isLiked) {
    api
      .likeCard(card._id, card.name, card.link)
      .then((res) => {
        console.log(res);
        card.isLiked = res.isLiked;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .disLikeCard(card._id)
      .then((res) => {
        console.log(res);
        card.isLiked = res.isLiked;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

const deletePopup = new PopupConfirm("#modal-card-popupdelte");
deletePopup.setEventListners();

const profileDescription = document.querySelector(selectors.profileDescription);
const profileTitle = document.querySelector(selectors.profileTitle);

const cardSection = new Section((data) => {
  cardSection.addItems(createCard(data));
}, selectors.cardSection);

// UserInfo
api.getUserInformation().then((view) => {
  userInfoData.setUserInfo({
    avatar: view.avatar,
    name: view.name,
    description: view.about,
  });
});
const userInfoData = new UserInfo({
  userNameSelector: ".profile__title",
  userDescriptionSelector: ".profile__description",
});
const cardPreviewImage = new PopupWithImage(selectors.previewpopup);
cardPreviewImage.setEventListners();

const userInfoPopup = new PopupWithForm(selectors.profileEditModal, (data) => {
  userInfoData.setUserInfo({
    avatar: data.avatar,
    name: data.title,
    description: data.description,
  });
  api.editUserInformation(data.title, data.description);
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

api
  .getInitialCards()
  .then((initialCards) => {
    cardSection.renderItems(initialCards);
  })
  .catch((err) => {
    console.error(err);
  });

function handleImageClick(data) {
  cardPreviewImage.open(data);
}

//update avatar
const avatarModal = new PopupWithForm("#modal-avatar", (userData) => {
  avatarModal.setLoading(true);
  api
    .updateAvatar(userData.url)
    .then((res) => {
      avatarModal.close();
      formValidators["avatar-form"].disableButton();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => avatarModal.setLoading(false));
});

avatarModal.setEventListners();

document
  .querySelector(".profile__button-img")
  .addEventListener("click", () => avatarModal.open());

const newcardPopup = new PopupWithForm(selectors.newCardModal, (cardData) => {
  api
    .addNewCards({ name: cardData.title, link: cardData.url })
    .then((res) => {
      console.log(res);
      cardSection.addItems(
        createCard({
          name: cardData.title,
          link: cardData.url,
          _id: cardData._id,
          isLiked: false,
        })
      );
      newcardPopup.close();
      formValidators["card-form"].disableButton();
    })
    .catch((err) => {
      console.error(err);
    });
});
function createCard(data) {
  const card = new Card(
    data,
    handleImageClick,
    selectors.cardTemplate,
    handleDeleteModal,
    handleLikeButton
  );
  return card.getView();
}

newcardPopup.setEventListners();
document
  .querySelector(selectors.addProfilebutton)
  .addEventListener("click", () => newcardPopup.open());
