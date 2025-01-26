export default class Card {
  constructor(
    { name, link, _id, isLiked },
    handleImageClick,
    cardSelector,
    handleDeleteModal,
    handleLikeButton
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
    this._handleDeleteModal = handleDeleteModal;
    this._handleLikeButton = handleLikeButton;
    this.isLiked = isLiked;
  }

  _setEventListeners() {
    // like button
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this.getLiked();
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton(this, this.getLiked());      
//      this.getLiked();
    });

    // delete button
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteModal(this);
    });

    // card image
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
        id: this._id,
      });
    });
  }

  removeCard() {
    this._cardElement.remove();
  }

  //get the card view
  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();
    return this._cardElement;
  }

  getLiked() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }
  setLiked(isLiked) {
    this.isLiked = isLiked;
    this.getLiked();
  }
}
