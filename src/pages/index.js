import "../pages/index.css";
import {
  addButton,
  editButton,
  addValidator,
  editValidator,
  editPopupOpen,
  addPopupOpen,
  avatarValidator,
  avatarButton,
  avatarPopupOpen,
  initialRender,
} from "../utils/constants.js";

initialRender();
editValidator.enableValidation();
addValidator.enableValidation();
avatarValidator.enableValidation();
editButton.addEventListener("click", editPopupOpen);
addButton.addEventListener("click", addPopupOpen);
avatarButton.addEventListener("click", avatarPopupOpen);
