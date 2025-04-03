import { closeForm } from './form.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentCountShown = bigPicture.querySelector('.social__comment-shown-count');
const commentCountTotal = bigPicture.querySelector('.social__comment-total-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentCounterBlock = document.querySelector('.social__comment-count');
const commentLoading = document.querySelector('.comments-loader');
const body = document.body;

const COMMENTS_PER_LOAD = 5;
let visibleCommentsCount = 0;
let currentComments = [];

function createCommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  commentElement.innerHTML = `
    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;
  return commentElement;
}

function updatePreview(photo) {
  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentCountTotal.textContent = photo.comments.length;
  caption.textContent = photo.description;
  currentComments = photo.comments;
  visibleCommentsCount = Math.min(COMMENTS_PER_LOAD, currentComments.length);
}

function renderComments() {
  commentsContainer.innerHTML = '';

  const visibleComments = currentComments.slice(0, visibleCommentsCount);
  visibleComments.forEach((comment) => {
    commentsContainer.appendChild(createCommentElement(comment));
  });

  commentCountShown.textContent = visibleComments.length;

  if (visibleComments.length >= currentComments.length) {
    commentLoading.classList.add('hidden');
  } else {
    commentLoading.classList.remove('hidden');
  }
}

function onLoadMoreClick() {
  visibleCommentsCount = Math.min(visibleCommentsCount + COMMENTS_PER_LOAD, currentComments.length);
  renderComments();
}

function openPreview(photo) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  updatePreview(photo);
  renderComments();

  commentCounterBlock.classList.remove('hidden');
  commentLoading.classList.remove('hidden');
}

function closePreview() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyPress);
}

export function onEscKeyPress(evt) {
  if (evt.key === 'Escape') {
    const isFormOpen = !document.querySelector('.img-upload__overlay').classList.contains('hidden');
    const isPreviewOpen = !document.querySelector('.big-picture').classList.contains('hidden');

    if (isFormOpen) {
      closeForm();
    } else if (isPreviewOpen) {
      closePreview();
    }
  }
}

commentLoading.addEventListener('click', onLoadMoreClick);
closeButton.addEventListener('click', closePreview);

export function initPreviews(photosArray) {
  const photoContainer = document.querySelector('.pictures');
  photoContainer.addEventListener('click', (event) => {
    const thumbnail = event.target.closest('.picture');
    if (!thumbnail) {
      return;
    }

    const photoId = Number(thumbnail.dataset.id);
    const photoData = photosArray.find((photo) => photo.id === photoId);
    if (photoData) {
      openPreview(photoData);
    }
  });
}
