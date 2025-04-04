import { onEscKeyPress } from './preview.js';
import { validateHashtags, getHashtagError } from './util.js';
import { onScaleDecreaseClick, onScaleIncreaseClick, onEffectsListChange } from './effects.js';
import { uploadPhotoData } from './fetch-api.js';
import { showSuccessNotification, showErrorNotification } from './confirmation-window.js';

const uploadForm = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const body = document.body;
const filePreview = document.querySelector('.img-upload__preview img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const effectsList = document.querySelector('.effects__list');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const MAX_COMMENT_LENGTH = 140;
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const updatePreview = () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  if (matches) {
    const fileURL = URL.createObjectURL(file);
    filePreview.src = fileURL;
  }
};

const openForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyPress);
};

export const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyPress);

  hashtagsInput.value = '';
  commentInput.value = '';
  pristine.reset();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const hashtagsValidation = validateHashtags(hashtagsInput.value);
  const commentValid = validateComment(commentInput.value);

  if (!hashtagsValidation.isValid || !commentValid || !pristine.validate()) {
    pristine.addError(hashtagsInput, hashtagsValidation.errors.join(', '));
  } else {
    hashtagsInput.value = hashtagsInput.value.trim().replace(/\s+/g, ' ');
    const formData = new FormData(uploadForm);

    submitButton.disabled = true;

    uploadPhotoData(formData)
      .then(() => {
        showSuccessNotification();
        uploadForm.reset();
      })
      .catch((error) => {
        showErrorNotification(error.message);
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  }
};

const initUploadForm = () => {
  pristine.addValidator(hashtagsInput, validateHashtags, getHashtagError);
  pristine.addValidator(commentInput, validateComment, `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов`);

  fileInput.addEventListener('change', () => {
    updatePreview();
    openForm();
  });

  cancelButton.addEventListener('click', closeForm);
  uploadForm.addEventListener('submit', onFormSubmit);

  [hashtagsInput, commentInput].forEach((input) => {
    input.addEventListener('keydown', (evt) => {
      if (onEscKeyPress(evt)) {
        evt.stopPropagation();
      }
    });
  });
};

scaleControlSmaller.addEventListener('click', onScaleDecreaseClick);
scaleControlBigger.addEventListener('click', onScaleIncreaseClick);
effectsList.addEventListener('change', onEffectsListChange);

initUploadForm();
