import {getRandomInt, getRandomMessage, getRandomName} from './util.js';

function generateRandomComment() {
  return {
    id: getRandomInt(0, 100),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomMessage(),
    name: getRandomName()
  };
}

function generateComments() {
  const commentsCount = getRandomInt(0, 30);
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    comments.push(generateRandomComment());
  }
  return comments;
}

const numberOfPhotos = 25;

function getPhoto(i) {
  return {
    id: i,
    url: `photos/${i}.jpg`,
    description: `Описание фотографии ${i}`,
    likes: getRandomInt(15, 200),
    comments: generateComments()
  };
}

function generatePhotos() {
  const photos = [];
  for (let i = 1; i <= numberOfPhotos; i++) {
    photos.push(getPhoto(i));
  }
  return photos;
}

export const photosArray = generatePhotos();
