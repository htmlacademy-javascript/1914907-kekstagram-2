
const createPictureElement = (pictureData) => {
  const template = document.querySelector('#picture');
  if (!template) {
    throw new Error('Шаблон #picture не найден');
  }

  const pictureElement = template.content.cloneNode(true);

  const img = pictureElement.querySelector('.picture__img');
  const likes = pictureElement.querySelector('.picture__likes');
  const comments = pictureElement.querySelector('.picture__comments');

  img.src = pictureData.url;
  img.alt = pictureData.description;
  likes.textContent = pictureData.likes;
  comments.textContent = pictureData.comments;

  return pictureElement;
};

const renderPictures = (pictures) => {
  const picturesContainer = document.querySelector('.pictures');
  if (!picturesContainer) {
    throw new Error('Контейнер .pictures не найден');
  }

  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = createPictureElement(picture);
    fragment.appendChild(pictureElement);
  });

  picturesContainer.innerHTML = '';

  picturesContainer.appendChild(fragment);
};

export { renderPictures };
