import { isEscKey } from './util.js';

const successTemplate = document.querySelector('#success').content;
export const successMessageElement = successTemplate.querySelector('.success');
const successButton = successTemplate.querySelector('.success__button');
const successInner = successTemplate.querySelector('.success__inner');

const errorTemplate = document.querySelector('#error').content;
export const errorMessageElement = errorTemplate.querySelector('.error');
const errorButton = errorMessageElement.querySelector('.error__button');
const errorInner = errorMessageElement.querySelector('.error__inner');

const ERROR_MESSAGE_REMOVE_TIME = 5000;

function onSuccessEscKey(evt) {
  if (isEscKey(evt)) {
    removeSuccessMessage();
  }
}

function onErrorEscKey(evt) {
  if (isEscKey(evt)) {
    removeErrorMessage();
  }
}

function removeSuccessMessage() {
  successMessageElement.remove();
  document.removeEventListener('keydown', onSuccessEscKey);
  document.removeEventListener('click', onDocumentClick);
}

function removeErrorMessage() {
  errorMessageElement.remove();
  document.removeEventListener('keydown', onErrorEscKey);
  document.removeEventListener('click', onBodyClick);
}

function onSuccessButtonClick() {
  removeSuccessMessage();
}

function onErrorButtonClick() {
  removeErrorMessage();
}

function onDocumentClick(evt) {
  if (!evt.target.closest(successInner)) {
    removeSuccessMessage();
  }
}

function onBodyClick(evt) {
  if (!evt.target.closest(errorInner)) {
    removeErrorMessage();
  }
}

export function showSuccessNotification() {
  document.body.append(successMessageElement);
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onSuccessEscKey);
}

export function showErrorNotification() {
  document.body.append(errorMessageElement);
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onErrorEscKey);

  setTimeout(() => {
    removeErrorMessage();
  }, ERROR_MESSAGE_REMOVE_TIME);
}
