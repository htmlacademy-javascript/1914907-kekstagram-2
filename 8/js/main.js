import { generatePhotos } from './photo-generator.js';
import { renderPhotos } from './photo-renderer.js';
import { renderPictures } from './picture.js';
import { pictures } from './data.js';

const photos = generatePhotos();

document.addEventListener('DOMContentLoaded', () => {
  renderPhotos(photos);
});

renderPictures(pictures);
