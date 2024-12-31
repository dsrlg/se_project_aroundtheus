import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({popupSelector});

    this._cardModalCaption =
      this._popupElement.querySelector(".modal__caption");
    this._cardPreviewImage = this._popupElement.querySelector(".modal__image");
  }
  open({name,link}) {
    this._cardPreviewImage.src = link;
    this._cardPreviewImage.alt = name;
    this._cardModalCaption.textContent = name;
    super.open();
  }

}
