import Popup from './Popup';

export default class PopupConfirm extends Popup{
    constructor(popupSelector, handleConfirmModal, api) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._inputList = this._popupForm.querySelectorAll(".modal__input");
        this.handleConfirmModal = this.handleConfirmModal.bind(this);
        this._api=api;
      }
      setSubmitFunction(submitFnc) {
        this._submitFunction= submitFnc;
        }
      setEventListners() {
        super.setEventListners();
        this._popupForm.addEventListener("submit", (e) => {
          e.preventDefault();
          this._popupForm.reset();
        });
      }
      handleConfirmModal(id){
        console.log(id);
        this._api.toDeleteCard(id).then(() => {
        if (this._cardElement) {
            this._cardElement.remove();
          } else {
            console.error('Card element is undefined.');
          }
    });
}
    
} 