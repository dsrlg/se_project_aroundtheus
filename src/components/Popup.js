export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    document.addEventListener("keyup", this._handleEscClose);
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    document.removeEventListener("keyup", this._handleEscClose);
    this._popupElement.classList.remove("modal_opened");
  }

  setEventListners() {
    this._popupElement.addEventListener("mousedown", (e) => {
      if (
        e.target.classList.contains("modal") ||
        e.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
