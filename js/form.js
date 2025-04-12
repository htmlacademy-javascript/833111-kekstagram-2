import { isEscKey } from './util.js';
import { validateHashtags, getHashtagError } from './util.js';
import { onScaleDecreaseClick, onScaleIncreaseClick, onEffectsListChange } from './effects.js';
import { uploadPhotoData } from './fetch-api.js';
import { showSuccessNotification, showErrorNotification } from './confirmation-window.js';

const uploadForm = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('.img-upload__input');
export const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const body = document.body;
const filePreview = document.querySelector('.img-upload__preview img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const effectsList = document.querySelector('.effects__list');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const scaleValue = document.querySelector('.scale__control--value');
const sliderWrapper = document.querySelector('.img-upload__effect-level');
const effectPreviews = document.querySelectorAll('.effects__preview');

const MAX_COMMENT_LENGTH = 140;
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
const DEFAULT_PREVIEW_SRC = 'img/upload-default-image.jpg';

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const resetPreviews = () => {
  filePreview.src = DEFAULT_PREVIEW_SRC;
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });
};

const updatePreview = () => {
  const file = fileInput.files[0];
  if (!file) {
    resetPreviews();
    return;
  }

  const fileName = file.name.toLowerCase();
  const isValidType = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (!isValidType) {
    showErrorNotification(`Допустимые форматы: ${FILE_TYPES.join(', ')}`);
    fileInput.value = '';
    resetPreviews();
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    filePreview.src = reader.result;
    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${reader.result})`;
    });
    overlay.classList.remove('hidden');
    body.classList.add('modal-open');
    body.addEventListener('keydown', closeFormOnEsc);
  };

  reader.onerror = () => {
    showErrorNotification('Ошибка при чтении файла');
    fileInput.value = '';
    resetPreviews();
  };

  reader.readAsDataURL(file);
};

export const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeFormOnEsc);
  uploadForm.reset();
  resetPreviews();
  scaleValue.value = '100%';
  filePreview.style.transform = 'scale(1)';
  filePreview.style.filter = 'none';
  sliderWrapper.classList.add('hidden');
  fileInput.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';
};

function closeFormOnEsc(evt) {
  if (!isEscKey(evt)) {
    return;
  }

  const isFocusOnHashtags = hashtagsInput === document.activeElement;
  const isFocusOnComment = commentInput === document.activeElement;

  if (isFocusOnHashtags || isFocusOnComment) {
    return;
  }

  closeForm();
}

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (!fileInput.files[0]) {
    showErrorNotification('Загрузите фотографию');
    return;
  }

  const isValid = pristine.validate();
  const hashtagsValidation = validateHashtags(hashtagsInput.value);
  const isCommentValid = validateComment(commentInput.value);

  if (!isValid || !hashtagsValidation.isValid || !isCommentValid) {
    if (!hashtagsValidation.isValid) {
      pristine.addError(hashtagsInput, hashtagsValidation.errors.join(', '));
    }
    return;
  }

  const formData = new FormData(uploadForm);
  submitButton.disabled = true;

  uploadPhotoData(formData)
    .then(() => {
      showSuccessNotification();
      closeForm();
    })
    .catch((err) => {
      showErrorNotification(err.message);
    })
    .finally(() => {
      submitButton.disabled = false;
    });

};

const initUploadForm = () => {
  pristine.addValidator(
    hashtagsInput,
    (value) => validateHashtags(value).isValid,
    getHashtagError
  );

  pristine.addValidator(
    commentInput,
    validateComment,
    `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов`
  );

  fileInput.addEventListener('change', updatePreview);
  cancelButton.addEventListener('click', closeForm);
  uploadForm.addEventListener('submit', onFormSubmit);

  [hashtagsInput, commentInput].forEach((input) => {
    input.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.stopPropagation();
      }
    });
  });
};

scaleControlSmaller.addEventListener('click', onScaleDecreaseClick);
scaleControlBigger.addEventListener('click', onScaleIncreaseClick);
effectsList.addEventListener('change', onEffectsListChange);

initUploadForm();
