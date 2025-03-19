import { initPreviews } from './preview.js';

const miniatureTemplate = document.querySelector('#picture').content;
const miniatureList = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

function fillPhotoCardTemplate(picture) {
  const miniatureElement = miniatureTemplate.cloneNode(true);
  const imageElement = miniatureElement.querySelector('.picture__img');
  imageElement.src = picture.url;
  imageElement.alt = picture.description;
  miniatureElement.querySelector('.picture__likes').textContent = picture.likes;
  miniatureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  miniatureElement.querySelector('.picture').dataset.id = picture.id;

  return miniatureElement;
}

export function createRenderPicture(photosArray) {
  photosArray.forEach((picture) => {
    const pictureCard = fillPhotoCardTemplate(picture);
    fragment.appendChild(pictureCard);
  });

  miniatureList.appendChild(fragment);

  initPreviews(photosArray);
}
