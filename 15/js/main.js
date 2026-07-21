import { getPictures } from './api.js';
import { renderPictures } from './picture.js';
import { showFilters } from './filters.js';
import './big-picture.js';
import './upload.js';
import './editor.js';
import './effects.js';

const loadPictures = async () => {
  try {
    const data = await getPictures();
    renderPictures(data);
    showFilters(data);
  } catch {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'data-error';
    errorMessage.textContent = 'Не удалось загрузить данные';
    document.body.append(errorMessage);
    setTimeout(() => errorMessage.remove(), 5000);
  }
};

loadPictures();
