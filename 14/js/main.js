// js/main.js

import { getPictures } from './api.js';
import { renderPictures } from './picture.js';
import './big-picture.js';
import './upload.js';
import './editor.js';
import './validation.js';

const loadPictures = async () => {
  try {
    const data = await getPictures();
    renderPictures(data);
  } catch {
    //
  }
};

loadPictures();
