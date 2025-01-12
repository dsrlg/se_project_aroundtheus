export default class Card {
  constructor({ name, link, id }, handleImageClick, cardSelector,  handleDeleteModal) {
    this._name = name;
    this._link = link;
    this._id = id;
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
    this._handleDeleteModal= handleDeleteModal;
  }

  _setEventListeners() {
    // like button
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });

    // delete button
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteModal({_id : this._id});
       
    });

    // card image
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
        id: this._id
      });
    });

    // delete confirm
    //  this._handleConfirmModal.addEventListener("click", () => {
    //   this._handle({ name: this._name, link: this._link });
    // });
  }

removeCard(){
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


}
