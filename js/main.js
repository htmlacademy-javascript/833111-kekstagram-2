import { fetchPhotos } from './fetch-api.js';
import { createRenderPicture } from './miniatures.js';
import { triggerTheFilter } from './filters.js';
import { showDataErrorNotification } from './confirmation-window.js';
import './form.js';

const loadAndRenderPhotos = async () => {
  try {
    const photos = await fetchPhotos();
    createRenderPicture(photos);
    triggerTheFilter(photos);
  } catch (error) {
    showDataErrorNotification();
  }
};

loadAndRenderPhotos();
