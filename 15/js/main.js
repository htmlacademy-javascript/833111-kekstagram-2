import {photosArray} from './data.js';
import {createRenderPicture} from './miniatures.js';
import { initFilters } from './filters.js';
import './form.js';

createRenderPicture(photosArray);
initFilters(photosArray);
