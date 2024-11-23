export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _handleCardImage() {
    e.preventDefault();
    cardPreviewImage.src = this._link;
    cardPreviewImage.alt = this._name;
    cardModalCaption.textContent = this._name;
    openPopup(previewImageModal);
  }

  _setEventListeners() {
    // like button
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    console.log(this._likeButton);
    this._likeButton.addEventListener("click", () => {
      console.log("click");
      this._likeButton.toggle("card__like-button_active");
    });

    // delete button
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._deleteButton.addEventListener("click", () => {
      this._cardElement.remove();
    });

    // card image
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardImageEl.addEventListener("click", () => {
      this._handleCardImage();
    });
  }

  getView() {
    //get the card view
    this._cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);
    console.log(this._cardElement);

     this._cardTitle = this._cardElement.querySelector(".card__title")
     this._cardTitle.textContent = this._name;
     this._cardElement.querySelector(".card__title").src = this._link;
     this._cardElement.querySelector(".card__title").alt = this._name;

    this._setEventListeners();
    return this._cardElement;
    //get event listners
    //return card
  }
}
