class FormValidator {
    constructor(options, formElement){
        this._formSelector=options.formSelector;
        this._inputSelector = options.inputSelector;
        this._inputErrorClass =options.inputErrorClass;
       this._errorClass=options.errorClass;
        this._submitButtonSelector=options._submitButtonSelector;
        this._inactiveButtonClass=options._inactiveButtonClass;
        this.formElement=formElement;
    }
    _setEventListeners(){

    }
    _enableValidation(){
this._formElement.addEventListener('submit', (e)=>{
e.preventDefault();
    });
_setEventListeners(this.formElement);
}

}
const formValidationOptions={
    formSelector: ".modal__form",
  inputSelector: ".modal__input",
  inputErrorClass: ".modal__error-text-visible",
  errorClass: ".modal__error",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
}
const addFormValidator = new FormValidator(formValidationOptions, formElement);
addFormValidator._enableValidation();