export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export const createCommentIdGenerator = () => {
  let lastId = 0;
  return () => ++lastId;
};
