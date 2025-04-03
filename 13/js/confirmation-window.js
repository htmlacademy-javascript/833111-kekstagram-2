import { onEscKeyPress } from './preview.js';

const successTemplate = document.querySelector('#success').content;
const successMessageElement = successTemplate.querySelector('.success');
const successButton = successTemplate.querySelector('.success__button');
const successInner = successTemplate.querySelector('.success__inner');
const errorTemplate = document.querySelector('#error').content;
const errorMessageElement = errorTemplate.querySelector('.error');
const errorButton = errorMessageElement.querySelector('.error__button');
const body = document.querySelector('body');
const errorInner = errorMessageElement.querySelector('.error__inner');
const ERROR_MESSAGE_REMOVE_TIME = 5000;

function removeSuccessMessage() {
  successMessageElement.remove();
}

function onSuccessButtonClick() {
  removeSuccessMessage();
}

function onDocumentClick(evt) {
  if (evt.target === successInner) {
    return;
  }
  removeSuccessMessage();
}

export function showSuccessNotification() {
  document.body.append(successMessageElement);
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onEscKeyPress);
}

function removeErrorMessage() {
  errorMessageElement.remove();
  errorButton.removeEventListener('click', onErrorButtonClick);
  body.removeEventListener('keydown', onEscKeyPress);
  body.removeEventListener('click', onBodyClick);
}

function onErrorButtonClick() {
  removeErrorMessage();
}

function onBodyClick(evt) {
  if (evt.target === errorInner) {
    return;
  }
  removeErrorMessage();
}

export function showErrorNotification() {
  document.body.append(errorMessageElement);
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onEscKeyPress);

  setTimeout(() => {
    removeErrorMessage();
  }, ERROR_MESSAGE_REMOVE_TIME);
}

