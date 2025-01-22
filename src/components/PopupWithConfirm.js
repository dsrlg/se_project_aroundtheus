import Popup from "./Popup";

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }
  setSubmitFunction(submitFnc) {
    this._submitFunction = submitFnc;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitFunction();
    });
  }
}
