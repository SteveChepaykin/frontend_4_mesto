import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector(".popup__image");
    this._popupTitle = this._popupElement.querySelector(".popup__image-title");
  }

  open(link, name) {
    this._popupImage.src = link;
    this._popupTitle.textContent = name;
    this._popupImage.alt = name;
    super.open();
  }
}
