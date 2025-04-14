import { isEscKey } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const ERROR_MESSAGE_REMOVE_TIME = 5000;

const successMessage = successTemplate.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');
const successInner = successMessage.querySelector('.success__inner');

const errorMessage = errorTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');
const errorInner = errorMessage.querySelector('.error__inner');

function removeSuccessMessage() {
  if (successMessage) {
    successMessage.remove();
    document.removeEventListener('click', onSuccessClickOutside);
    document.removeEventListener('keydown', onSuccessEsc);
  }
}

function onSuccessButtonClick() {
  removeSuccessMessage();
}

function onSuccessClickOutside(evt) {
  if (!successInner.contains(evt.target)) {
    removeSuccessMessage();
  }
}

function onSuccessEsc(evt) {
  if (isEscKey(evt)) {
    removeSuccessMessage();
  }
}

export function showSuccessNotification() {
  document.body.append(successMessage);
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('click', onSuccessClickOutside);
  document.addEventListener('keydown', onSuccessEsc);
}

function removeErrorMessage() {
  if (errorMessage) {
    errorMessage.remove();
    document.removeEventListener('click', onErrorClickOutside);
    document.removeEventListener('keydown', onErrorEsc);
  }
}

function onErrorButtonClick() {
  removeErrorMessage();
}

function onErrorClickOutside(evt) {
  if (!errorInner.contains(evt.target)) {
    removeErrorMessage();
  }
}

function onErrorEsc(evt) {
  if (isEscKey(evt)) {
    removeErrorMessage();
  }
}

export function showErrorNotification() {
  document.body.append(errorMessage);
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('click', onErrorClickOutside);
  document.addEventListener('keydown', onErrorEsc);
}

export function showDataErrorNotification() {
  const message = dataErrorTemplate.cloneNode(true);
  document.body.append(message);

  setTimeout(() => {
    message.remove();
  }, ERROR_MESSAGE_REMOVE_TIME);
}
