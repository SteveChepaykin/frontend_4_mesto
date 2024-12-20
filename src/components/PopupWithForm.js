import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  open() {
    super.open();
    this._form.reset();
    this.hideError();
  }

  _getInputValues() {
    const inputValues = {};
    const inputs = Array.from(this._popupElement.querySelectorAll("input"));
    inputs.forEach((item) => {
      inputValues[item.getAttribute("name")] = item.value;
    });
    return inputValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._errorElement = this._popupElement.querySelector(".popup__form-error");
    this._form = this._popupElement.querySelector("form");
    this._formHandler = (evt) => {
      this._formSubmitHandler(evt, this._getInputValues());
    };
    this._form.addEventListener("submit", this._formHandler);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener("submit", this._formHandler);
  }

  showError(text) {
    this._errorElement.textContent = text;
    this._errorElement.classList.add("popup__form-error_display_visible");
  }

  hideError() {
    this._errorElement.textContent = "";
    this._errorElement.classList.remove("popup__form-error_display_visible");
  }
}
