class FormValidator {
  constructor(options, form) {
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._form = form;
  }

  _setEventListeners() {
    const inputs = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        this._checkInputValidity(this._form, input);
        this._toggleButtonState(inputs);
        e.preventDefault();
      });
    });
  }

  _showInputError(form, input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.urlContent = input.validationMessage;
  }

  _hideInputError(form, input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.urlContent = "";
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _toggleButtonState(inputEls) {
    let foundInValid = false;
    inputEls.forEach((input) => {
      if (!input.validity.valid) {
        foundInValid = true;
      }
    });
    if (foundInValid) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _checkInputValidity(form, input) {
    if (!input.validity.valid) {
      return this._showInputError(this._form, input);
    } else {
      this._hideInputError(this._form, input);
    }
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners(this._form);
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }
}

export default FormValidator;
