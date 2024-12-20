import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { config } from "./data.js";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import { getInitialCards, getUserInformation, setLike, deleteLike, setUserInfo, setUserAvatar, createCard, deleteCard } from "../components/Api.js";

let userId;
let cardSection;

const imgPopup = new PopupWithImage(".popup_target_img");
const formAdd = document.forms.add;
const formEdit = document.forms.edit;
const formAvatar = document.forms.avatar;
const nameInput = document.querySelector('input[name="forename"]');
const jobInput = document.querySelector('input[name="job"]');

const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

const addCard = function (data) {
  return new Card(
    data,
    userId,
    "#card",
    function (link, name) {
      imgPopup.open(link, name);
    },
    function (card) {
      const id = card.getId()
      let action;
      if (
        this._likes.some((item) => {
          return item._id === this._userId;
        })) {
        action = deleteLike(id);
      } else {
        action = setLike(id);
      }
      return action
        .then((data) => {
          card.updateLikes(data.likes.length, data.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    function (card) {
      deletePopup.setItem(card)
      deletePopup.open();
    }
  ).getCard();
};

const addPopup = new PopupWithForm(".popup_target_add", function (
  evt,
  inputValues
) {
  evt.preventDefault();
  this._buttonElement = this._popupElement.querySelector(".popup__save");
  this._buttonElement.textContent = "Создание...";
  const cardName = inputValues.title;
  const cardLink = inputValues.url;
  const img = document.createElement("img");
  img.src = cardLink;
  img.onload = () => {
    createCard({ name: cardName, link: cardLink })
      .then((data) => {
        cardSection.addItem(addCard(data));
        this.close();
      })
      .catch((err) => {
        if (err.toString().includes("Ошибка:", 0)) {
          this.showError(err);
        } else {
          this.showError("Невозможно загрузить карточку, попробуйте снова");
        }
      })
      .finally(() => {
        this._buttonElement.textContent = "Создать";
      });
  };
  img.onerror = () => {
    this.showError("Невозможно загрузить ваше изображение, попробуйте снова");
    this._buttonElement.textContent = "Создать";
  };
});

const editPopup = new PopupWithForm(".popup_target_edit", function (
  evt,
  inputValues
) {
  evt.preventDefault();
  this._buttonElement = this._popupElement.querySelector(".popup__save");
  this._buttonElement.textContent = "Сохранение...";
  setUserInfo({
    name: inputValues.forename,
    about: inputValues.job,
  })
    .then((data) => {
      profileInfo.setUserInfo({
        name: data.name,
        job: data.about,
      });
      this.close();
    })
    .catch((err) => {
      if (err.toString().includes("Ошибка:", 0)) {
        this.showError(err);
      } else {
        this.showError("Невозможно загрузить данные, попробуйте снова");
      }
    })
    .finally(() => {
      this._buttonElement.textContent = "Сохранить";
    });
});

const avatarPopup = new PopupWithForm(".popup_target_avatar", function (
  evt,
  inputValues
) {
  evt.preventDefault();
  this._buttonElement = this._popupElement.querySelector(".popup__save");
  this._buttonElement.textContent = "Сохранение...";
  setUserAvatar({ avatar: inputValues.avatar })
    .then((data) => {
      if (data.errors) {
        return Promise.reject(
          `Ошибка: невозможно загрузить данные, ${data.errors.avatar.message}, попробуйте снова`
        );
      } else {
        profileInfo.setUserAvatar(data.avatar);
        this.close();
      }
    })
    .catch((err) => {
      if (err.toString().includes("Ошибка:", 0)) {
        this.showError(err);
      } else {
        this.showError("Невозможно загрузить данные, попробуйте снова");
      }
    })
    .finally(() => {
      this._buttonElement.textContent = "Сохранить";
    });
});

const deletePopup = new PopupWithConfirm(".popup_target_delete", function (evt) {
  evt.preventDefault();
  this._buttonElement = this._popupElement.querySelector(".popup__save");
  this._buttonElement.textContent = "Удаление...";
  deleteCard(this._itemId)
    .then(() => {
      this._item.deleteElement();
      this.close();
    })
    .catch((err) => {
      if (err.toString().includes("Ошибка:", 0)) {
        this.showError(err);
      } else {
        this.showError("Невозможно удалить карточку, попробуйте снова");
      }
    })
    .finally(() => {
      this._buttonElement.textContent = "Да";
    });
});

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const avatarButton = document.querySelector(".profile__avatar-overlay");
export const addValidator = new FormValidator(config, formAdd);
export const editValidator = new FormValidator(config, formEdit);
export const avatarValidator = new FormValidator(config, formAvatar);
export const editPopupOpen = function () {
  const info = profileInfo.getUserInfo();
  editValidator.setDefault(true);
  editPopup.open();
  nameInput.value = info.name;
  jobInput.value = info.job;
};

export const addPopupOpen = function () {
  addValidator.setDefault(false);
  addPopup.open();
};

export const avatarPopupOpen = function () {
  avatarValidator.setDefault(false);
  avatarPopup.open();
};

const renderInitialCards = (data) => {
  cardSection = new Section(
    {
      items: data,
      renderer: function (item) {
        const card = addCard(item);
        this.addInitialItem(card);
      },
    },
    ".card__container"
  );
  cardSection.renderItems();
};

const renderInitialUserInformation = (data) => {
  profileInfo.setUserInfo({ name: data.name, job: data.about });
  profileInfo.setUserAvatar(data.avatar);
  userId = data._id;
};

export const initialRender = function () {
  Promise.all([getInitialCards(), getUserInformation()])
    .then((values) => {
      renderInitialUserInformation(values[1]);
      renderInitialCards(values[0]);
    })
    .catch((err) => {
      if (err.toString().includes("Ошибка:", 0)) {
        console.log(err);
      } else {
        console.log("Не удалось загрузить карточки");
      }
    });
};
