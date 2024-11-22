 class FormValidator {
    constructor(options, form){
        this._formSelector=options.formSelector;
        this._inputSelector = options.inputSelector;
        this._inputErrorClass =options.inputErrorClass;
       this._errorClass=options.errorClass;
        this._submitButtonSelector=options._submitButtonSelector;
        this._inactiveButtonClass=options._inactiveButtonClass;
        this._form=form;
    }

    _setEventListeners(){
        const inputs = [...this._form.querySelectorAll(this._inputSelector)];
        const submitButton = this._form.querySelector(this._submitButtonSelector);
        inputs.forEach((input) => {
          input.addEventListener("input", (event) => {
            checkInputValidity(form, input, options);
            toggleButtonState(inputs, submitButton, options);
            event.preventDefault();
          });
        });
    }

    _showInputError(form, input){
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = input.validationMessage;
        errorElement.urlContent = input.validationMessage;
    }

    _hideInputError(form, input){
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        errorElement.urlContent = "";
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }

    _toggleButtonState(inputEls, submitButton, options){
        let foundInValid = false;
        inputEls.forEach((input) => {
          if (!input.validity.valid) {
            foundInValid = true;
          }
        });
        if (foundInValid) {
          submitButton.classList.add(this._inactiveButtonClass);
          submitButton.disabled = true;
        } else {
          submitButton.classList.remove(this._inactiveButtonClass);
          submitButton.disabled = false;
        }
    }

    _checkInputValidity(form, input, options){
        if (!input.validity.valid) {
            return showInputError(form, input);
          } else {
            hideInputError(form, input);
          }
    }

    _enableValidation(){
    this._form.addEventListener("submit", (e) => {
    e.preventDefault();
    });
    
    this._setEventListeners(this._form);
}
}


export default  FormValidator;