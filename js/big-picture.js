const COMMENTS_STEP = 5;

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

let currentComments = [];
let shownCommentsCount = 0;

const renderComments = () => {
  const totalCommentsCount = currentComments.length;
  totalComments.textContent = totalCommentsCount;

  if (totalCommentsCount === 0) {
    commentsList.innerHTML = '';
    commentCount.textContent = '0';
    commentsLoader.classList.add('hidden');
    return;
  }

  const endIndex = Math.min(shownCommentsCount + COMMENTS_STEP, totalCommentsCount);

  commentsList.innerHTML = '';
  for (let i = 0; i < endIndex; i++) {
    const commentElement = createCommentElement(currentComments[i]);
    commentsList.appendChild(commentElement);
  }

  commentCount.textContent = endIndex;

  if (endIndex >= totalCommentsCount) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const openBigPicture = (pictureData) => {
  bigImage.src = pictureData.url;
  bigImage.alt = pictureData.description;
  likesCount.textContent = pictureData.likes;
  captionText.textContent = pictureData.description;

  currentComments = pictureData.comments || [];
  shownCommentsCount = 0;
  renderComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const onCancelButtonClick = () => {
  closeBigPicture();
};

const onOverlayClick = (evt) => {
  if (evt.target === bigPicture) {
    closeBigPicture();
  }
};

const onCommentsLoaderClick = () => {
  shownCommentsCount += COMMENTS_STEP;
  renderComments();
};

cancelButton.addEventListener('click', onCancelButtonClick);
bigPicture.addEventListener('click', onOverlayClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { openBigPicture };
