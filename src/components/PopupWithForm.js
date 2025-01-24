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
  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
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
    this._popupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      this.setLoading(true);
      this._submitButton.disabled = true;
      const formData = this._getinputvalues();
      //setTimeout(() => {
      await this._handleFormSubmit(formData);
      this._submitButton.textContent = this._defaultButtonText;
      this._submitButton.disabled = false;
      //} 3000);
      this._popupForm.reset();
    });
  }

  setSubmitAction(handleSubmit) {
    this._handleFormSubmit = handleSubmit;
  }

  getForm() {
    return this._popupForm;
  }
  
}
