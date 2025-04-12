import { initPreviews } from './preview.js';

const PICTURE_SELECTORS = {
  CONTAINER: '.pictures',
  TEMPLATE: '#picture',
  ITEM: '.picture',
  IMAGE: '.picture__img',
  LIKES: '.picture__likes',
  COMMENTS: '.picture__comments',
  UPLOAD_FORM: '.img-upload'
};

function createPhotoElement(photo) {
  const template = document.querySelector(PICTURE_SELECTORS.TEMPLATE).content.cloneNode(true);
  const element = template.querySelector(PICTURE_SELECTORS.ITEM);

  element.querySelector(PICTURE_SELECTORS.IMAGE).src = photo.url;
  element.querySelector(PICTURE_SELECTORS.IMAGE).alt = photo.description;
  element.querySelector(PICTURE_SELECTORS.LIKES).textContent = photo.likes;
  element.querySelector(PICTURE_SELECTORS.COMMENTS).textContent = photo.comments.length;
  element.dataset.id = photo.id;

  return element;
}

const container = document.querySelector(PICTURE_SELECTORS.CONTAINER);
const fragment = document.createDocumentFragment();

export function createRenderPicture(photos) {
  container.querySelectorAll(PICTURE_SELECTORS.ITEM).forEach((pic) => {
    pic.remove();
  });

  photos.forEach((photo) => {
    fragment.appendChild(createPhotoElement(photo));
  });

  container.appendChild(fragment);
  initPreviews(photos);
}

export const PictureSelectors = {
  CONTAINER: PICTURE_SELECTORS.CONTAINER,
  ITEM: PICTURE_SELECTORS.ITEM,
  UPLOAD_FORM: PICTURE_SELECTORS.UPLOAD_FORM
};
