import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._defaultButtonText = this._submitButton.textContent;
  }

  renderLoading(isLoading, loadingText='Saving...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _getinputvalues() {
    const fromValues = {};
    this._inputList.forEach((input) => {
      fromValues[input.name] = input.value;
    });
    return fromValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit",  (e) => {
      e.preventDefault();
      this.renderLoading(false);
      this._submitButton.disabled = true;
      const formData = this._getinputvalues();
       this._handleFormSubmit(formData);
    });
  }

  resetForm(){
    this._popupForm.reset();
  }

  setSubmitAction(handleSubmit, cardSubmit) {
    this._handleFormSubmit = handleSubmit;
    this._cardFormSubmit= cardSubmit;
  }

  getForm() {
    return this._popupForm;
  }
}
