const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentCountShown = bigPicture.querySelector('.social__comment-shown-count');
const commentCountTotal = bigPicture.querySelector('.social__comment-total-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;

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
}

function openPreview(photo) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  updatePreview(photo);

  commentsContainer.innerHTML = '';
  photo.comments.forEach((comment) => {
    commentsContainer.appendChild(createCommentElement(comment));
  });

  commentCountShown.textContent = photo.comments.length;
}

function closePreview() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(evt) {
  if (evt.key === 'Escape') {
    closePreview();
  }
}

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
