import Popup from './Popup';

export default class PopupConfirm extends Popup{
    constructor(popupSelector, handleConfirmModal) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._inputList = this._popupForm.querySelectorAll(".modal__input");
        this._handleConfirmModal = handleConfirmModal;
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
      //function handleConfirmModal()
    }
    