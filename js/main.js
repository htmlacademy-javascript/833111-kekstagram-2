import { fetchPhotos } from './fetch-api.js';
import { createRenderPicture } from './miniatures.js';
import { initFilters } from './filters.js';
import './form.js';

const loadAndRenderPhotos = async () => {
  try {
    const photos = await fetchPhotos();
    createRenderPicture(photos);
    initFilters(photos);
  } catch (error) {
    window.console.error('Ошибка при загрузке фотографий:', error);
  }
};

loadAndRenderPhotos();
