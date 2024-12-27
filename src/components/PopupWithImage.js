import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({popupSelector});

    this._cardModalCaption =
      this._popupElement.querySelector(".modal__caption");
    this._cardPreviewImage = this._popupElement.querySelector(".modal__image");
  }
  open(data) {
    this._cardPreviewImage.src = data.link;
    this._cardPreviewImage.alt = data.name;
    this._cardModalCaption.textContent = data.name;
    super.open();
  }

}
