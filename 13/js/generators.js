import { getRandomInteger, getRandomElement, createCommentIdGenerator } from './util.js';
import { MESSAGES, NAMES, DESCRIPTIONS } from './data.js';

const getNextCommentId = createCommentIdGenerator();

export function generateComment() {
  const numberOfMessages = getRandomInteger(1, 2);
  let message;

  if (numberOfMessages === 1) {
    message = getRandomElement(MESSAGES);
  } else {
    const firstMessage = getRandomElement(MESSAGES);
    const secondMessage = getRandomElement(MESSAGES);
    message = `${firstMessage} ${secondMessage}`;
  }

  return {
    id: getNextCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: message,
    name: getRandomElement(NAMES)
  };
}

export function generateComments() {
  const commentsCount = getRandomInteger(0, 30);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments.push(generateComment());
  }

  return comments;
}

export function generatePhotos() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: DESCRIPTIONS[i - 1],
      likes: getRandomInteger(15, 200),
      comments: generateComments()
    });
  }

  return photos;
}
