import {photosArray} from './data.js';

const miniatureTemplate = document.querySelector('#picture').content;
const miniatureList = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

photosArray.forEach(({ url, description, likes, comments }) => {
  const miniatureElement = miniatureTemplate.cloneNode(true);
  const imageElement = miniatureElement.querySelector('.picture__img');
  imageElement.src = url;
  imageElement.alt = description;
  miniatureElement.querySelector('.picture__likes').textContent = likes;
  miniatureElement.querySelector('.picture__comments').textContent = comments.length;

  fragment.appendChild(miniatureElement);
});

miniatureList.appendChild(fragment);
