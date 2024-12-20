export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("popup_display_opened");
    this._setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("popup_display_opened");
    this._removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _setEventListeners() {
    this._closeButton = this._popupElement.querySelector(".popup__exit-button");
    this._overlay = this._popupElement.querySelector(".popup__overlay");
    this._escHandler = (evt) => {
      this._handleEscClose(evt);
    };
    this._overlayHandler = () => {
      this.close();
    };
    this._closeHandler = () => {
      this.close();
    };
    document.addEventListener("keydown", this._escHandler);
    this._overlay.addEventListener("click", this._overlayHandler);
    this._closeButton.addEventListener("click", this._closeHandler);
  }
  
  _removeEventListeners() {
    document.removeEventListener("keydown", this._escHandler);
    this._overlay.removeEventListener("click", this._overlayHandler);
    this._closeButton.removeEventListener("click", this._closeHandler);
  }
}
