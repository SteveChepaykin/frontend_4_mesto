import PopupWithForm from "./PopupWithForm.js";

export default class PopupWithConfirm extends PopupWithForm {
  constructor (popupSelector, formSubmitHandler) {
    super(popupSelector, formSubmitHandler);
  }
  setItem(item) {
    this._item = item;
    this._itemId= item.getId();
  }
}