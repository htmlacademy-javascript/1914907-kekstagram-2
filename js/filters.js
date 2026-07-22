import { renderPictures } from './picture.js';

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const filterContainer = document.querySelector('.img-filters');

let currentPictures = [];
let activeFilter = 'default';

const getRandomPictures = (pictures) => {
  const shuffled = [...pictures];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 10);
};

const getDiscussedPictures = (pictures) => [...pictures].sort((a, b) => b.comments.length - a.comments.length);

const debounce = (callback, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};

const renderFilteredPictures = () => {
  let filteredPictures = [];

  switch (activeFilter) {
    case 'filter-default':
      filteredPictures = currentPictures;
      break;
    case 'filter-random':
      filteredPictures = getRandomPictures(currentPictures);
      break;
    case 'filter-discussed':
      filteredPictures = getDiscussedPictures(currentPictures);
      break;
    default:
      filteredPictures = currentPictures;
  }

  renderPictures(filteredPictures);
};

const debouncedRender = debounce(renderFilteredPictures, 500);

const setActiveFilter = (filterId) => {
  document.querySelectorAll('.img-filters__button').forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  const activeButton = document.querySelector(`#${filterId}`);
  if (activeButton) {
    activeButton.classList.add('img-filters__button--active');
  }

  activeFilter = filterId;
  debouncedRender();
};

filterDefault.addEventListener('click', () => setActiveFilter('filter-default'));
filterRandom.addEventListener('click', () => setActiveFilter('filter-random'));
filterDiscussed.addEventListener('click', () => setActiveFilter('filter-discussed'));

const showFilters = (pictures) => {
  currentPictures = pictures;
  filterContainer.classList.remove('img-filters--inactive');
};

export { showFilters };
