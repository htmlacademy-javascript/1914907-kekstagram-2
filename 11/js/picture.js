const createPictureElement = (pictureData) => {
  const template = document.querySelector('#picture');

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
  const container = document.querySelector('.pictures__list');

  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const element = createPictureElement(picture);
    fragment.appendChild(element);
  });

  container.innerHTML = '';
  container.appendChild(fragment);
};

export { renderPictures };
