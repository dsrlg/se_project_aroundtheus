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
  headers: {
    authorization: "5782927d-9e6f-49bd-bfea-d56552d67f06",
    "Content-Type": "application/json",
  },
});

function handleDeleteModal(card) {
  deletePopup.open();
  deletePopup.setSubmitFunction(() => {
    api
      .toDeleteCard(card._id)
      .then(() => {
        deletePopup.close();
        card.removeCard();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleLikeButton(card) {
  if (card.isLiked) {
    api
      .likeCard(card._id, card.name, card.link)
      .then((res) => {
        console.log(res);
        card.setLiked(!res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .disLikeCard(card._id)
      .then((res) => {
        card.setLiked(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

const deletePopup = new PopupConfirm("#modal-card-popupdelte");
deletePopup.setEventListeners();

const profileDescription = document.querySelector(selectors.profileDescription);
const profileTitle = document.querySelector(selectors.profileTitle);

const cardSection = new Section((data) => {
  cardSection.addItems(createCard(data));
}, selectors.cardSection);

// UserInfo
api
  .getUserInformation()
  .then((view) => {
    userInfoData.setUserInfo({
      name: view.name,
      description: view.about,
    });
    userInfoData.setAvatar(view.avatar);
  })
  .catch((err) => {
    console.error(err);
  });
const userInfoData = new UserInfo({
  userNameSelector: ".profile__title",
  userDescriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});
const cardPreviewImage = new PopupWithImage(selectors.previewpopup);
cardPreviewImage.setEventListeners();

const profileSubmmitButton = document.querySelector(
  selectors.profileSubmitButton
);
function handleProfileSubmit({ title, description }) {

  profileSubmmitButton.textContent = "Saving...";
  api
    .editUserInformation(title, description)
    .then((data) => {
      userInfoPopup.close();
      userInfoData.setUserInfo({
        name: data.name,
        description: data.about,
      });
    })
    .catch((error) => console.error("Request failed", error))
    .finally(() => {
      //userInfoPopup.setLoading(false);
      profileSubmmitButton.textContent = "Save";
    });
}

const cardSubmmitButton = document.querySelector(
  selectors.cardSubmitButton
);
function cardProfileSubmit({ name, link }) {

cardSubmmitButton.textContent = "Saving...";
  api
    .addNewCards(name, link)
    .then((data) => {
      userInfoPopup.close();
      userInfoData.setUserInfo({
        name: data.name,
        link: data.link,
      });
    })
    .catch((error) => console.error("Request failed", error))
    .finally(() => {
      // userInfoPopup.setLoading(false);
      cardSubmmitButton.textContent = "Save";
    });
}

const userInfoPopup = new PopupWithForm( 
  selectors.profileEditModal,
  handleProfileSubmit,
  cardProfileSubmit
);
userInfoPopup.setEventListeners();

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
      userInfoData.setAvatar(res.avatar);
      avatarModal.close();
      formValidators["avatar-form"].disableButton();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => avatarModal.setLoading(false));
});

avatarModal.setEventListeners();

document
  .querySelector(".profile__button-img")
  .addEventListener("click", () => avatarModal.open());

const newCardPopup = new PopupWithForm(selectors.newCardModal, (cardData) => {
  newCardPopup.setLoading(true);
  api
    .addNewCards({ name: cardData.title, link: cardData.url })
    .then((res) => {
      cardSection.addItems(
        createCard({
          name: cardData.title,
          link: cardData.url,
          _id: res._id,
          isLiked: false,
        })
      );
      newCardPopup.close();
      formValidators["card-form"].disableButton();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => newCardPopup.setLoading(false));
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

newCardPopup.setEventListeners();
document
  .querySelector(selectors.addProfilebutton)
  .addEventListener("click", () => newCardPopup.open());
