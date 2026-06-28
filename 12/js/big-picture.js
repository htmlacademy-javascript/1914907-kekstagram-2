const bigPicture = document.querySelector('.big-picture');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const captionText = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-shown-count');
const totalComments = bigPicture.querySelector('.social__comment-total-count');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');

const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
commentCountBlock.classList.add('hidden');
commentsLoader.classList.add('hidden');

const createCommentElement = (commentData) => {
  const li = document.createElement('li');
  li.className = 'social__comment';

  const img = document.createElement('img');
  img.className = 'social__picture';
  img.src = commentData.avatar;
  img.alt = commentData.name;
  img.width = 35;
  img.height = 35;

  const p = document.createElement('p');
  p.className = 'social__text';
  p.textContent = commentData.message;

  li.appendChild(img);
  li.appendChild(p);

  return li;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

function openBigPicture(pictureData) {
  bigImage.src = pictureData.url;
  bigImage.alt = pictureData.description;
  likesCount.textContent = pictureData.likes;
  captionText.textContent = pictureData.description;
  totalComments.textContent = pictureData.comments.length;

  const shownComments = pictureData.comments.slice(0, 5);
  commentCount.textContent = shownComments.length;

  commentsList.innerHTML = '';
  shownComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentsList.appendChild(commentElement);
  });

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

cancelButton.addEventListener('click', closeBigPicture);

bigPicture.addEventListener('click', (evt) => {
  if (evt.target === bigPicture) {
    closeBigPicture();
  }
});

export { openBigPicture };
