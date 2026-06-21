import { generatePhotos } from './photo-generator.js';
import { renderPhotos } from './photo-renderer.js';

const photos = generatePhotos();

document.addEventListener('DOMContentLoaded', () => {
  renderPhotos(photos);
});
