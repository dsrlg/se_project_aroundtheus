//const options = {
//  formSelector: ".form",
//inputSelector: ".modal__input",
//submitButtonSelector: ".modal__button",
//inactiveButtonClass: "popup__button_disabled",
//inputErrorClass: "popup__input_type_error",
//errorClass: "popup__error_visible"
//};

//function showInputerror(formElement, inputElement, options){
////const errorMesssageEl= form.querySelector(`#{inputElement.id}-error`);
//inputElement.classList.add(options.inputErrorClass);
//errorMesssageEl.textContent=inputElement.validationMessage;
//errorMesssageEl.classList.add(errorClass);
//}

//function checkInputValidity(formElement, inputElement, options){
//if(!inputElement.validity.valid){
//  showInputerror(formElement, inputElement, options);
//}else{
//  hideInputerror(formElement, inputElement, options);
//}
//////}

//function setEventListenrs(formElement, options){
//  const{inputSelector}=options;
//const inputElement = [...formElement.querySelectorAll(inputSelector)];
//inputElement.forEach(inputElement => {
//  inputElement.addEventListener("input" , () =>{
//checkInputValidity(formElement, inputElement, options);
//      });
//} );
//}
//function enableValidation(options){
//const formElement = [...(document.querySelectorAll("options.formSelector"))];
//formElement.forEach(formElement =>{
//  formElement.addEventListener("submit", (e) =>{
//e.preventDefault();
//  });
//setEventListenrs(formElement, options);
//});
//}
//enableValidation(options);

//per New video

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  inputErrorClass: "popup__error-visible",
};
enableValidation(options);

function enableValidation(options) {
  const forms = document.querySelectorAll(options.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, options);
  });
}

function setEventListeners(form, options) {
  const inputs = form.querySelectorAll(options.inputSelector);
  inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
      checkInputValidity(input, options);
    });
  });
}

function checkInputValidity(input, options) {
    console.log(`${input}.id`)
  const errorElement = document.querySelector(`${input.id}-error`);
  if (!input.validity.valid) {
    showInputError(input, errorElement, input.validationMessage);
  } else {
    hideInputError(input, errorElement);
  }
}
function showInputError(input, errorElement, message) {
  errorElement.textContent = inputErrorClass.value;
  errorElement.classList.add(options.inputErrorClass);
  input.classList.add(".popup__error-visible" );
}

function hideInputError(input, errorElement) {
  errorElement.textContent = "";
  errorElement.classList.remove(options.inputErrorClass);
  input.classList.remove("form__input_type_error");
}
