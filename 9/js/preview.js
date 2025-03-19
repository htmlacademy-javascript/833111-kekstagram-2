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

function openPreview(photo) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentCountTotal.textContent = photo.comments.length;
  caption.textContent = photo.description;

  commentsContainer.innerHTML = '';
  photo.comments.forEach((comment) => {
    commentsContainer.appendChild(createCommentElement(comment));
  });

  commentCountShown.textContent = photo.comments.length;

  document.addEventListener('keydown', onEscKeyPress);
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
  const thumbnails = document.querySelectorAll('.picture');

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      const photoId = Number(thumbnail.dataset.id);
      const photoData = photosArray.find((photo) => photo.id === photoId);
      openPreview(photoData);
    });
  });
}
