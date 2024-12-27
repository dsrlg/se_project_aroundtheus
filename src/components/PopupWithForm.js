import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input"); 
    this._handleFormSubmit = handleFormSubmit;
  }

_getinputvalues(){
const fromValues= {};
this._inputList.forEach((input) =>{
  fromValues[input.name]=input.value;
});
return fromValues;
}

seteventlistener(){
  super.seteventlistener();
  this._popupForm.addEventListner("submit", (e) =>{
    e.prevenDefault();
    this._handleFormSubmit=this._getinputvalues()
  });
}

  close() {
    this._popupForm.reset();
    super.close();
  }
}
