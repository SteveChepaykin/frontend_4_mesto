import '../utils/data.js';
import { options } from '../utils/data.js';

function defaultCheck(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export function getInitialCards() {
  return fetch(`${options.baseUrl}/cards`, { headers: options.headers }).then(
    (res) => defaultCheck(res)
  );
}

export function getUserInformation() {
  return fetch(`${options.baseUrl}/users/me`, { headers: options.headers }).then(
    (res) => defaultCheck(res)
  );
}

export function setLike(id) {
  return fetch(`${options.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: options.headers,
  }).then((res) => defaultCheck(res));
}

export function deleteLike(id) {
  return fetch(`${options.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: options.headers,
  }).then((res) => defaultCheck(res));
}

export function setUserInfo(object) {
  return fetch(`${options.baseUrl}/users/me`, {
    method: "PATCH",
    headers: options.headers,
    body: JSON.stringify(object),
  }).then((res) => defaultCheck(res));
}

export function setUserAvatar(link) {
  return fetch(`${options.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: options.headers,
    body: JSON.stringify(link),
  }).then((res) => defaultCheck(res));
}

export function createCard(card) {
  return fetch(`${options.baseUrl}/cards`, {
    method: "POST",
    headers: options.headers,
    body: JSON.stringify(card),
  }).then((res) => defaultCheck(res));
}

export function deleteCard(id) {
  return fetch(`${options.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: options.headers,
  }).then((res) => defaultCheck(res));
}
