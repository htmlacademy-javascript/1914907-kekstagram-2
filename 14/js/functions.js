// function onCheckString(string, maxLength) {
//   return string.length <= maxLength;
// }

// function onCheckPalindrome(str) {
//   const normalized = str.toLowerCase().replaceAll(' ', '');
//   for (let i = 0; i < normalized.length / 2; i++) {
//     if (normalized[i] !== normalized[normalized.length - 1 - i]) {
//       return false;
//     }
//   }
//   return true;
// }

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const createCommentIdGenerator = () => {
  let lastId = 0;
  return () => ++lastId;
};
const getNextCommentId = createCommentIdGenerator();

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Александр', 'Анна', 'Дмитрий', 'Елена', 'Максим',
  'Мария', 'Иван', 'Ольга', 'Сергей', 'Татьяна',
  'Алексей', 'Наталья', 'Владимир', 'Ирина', 'Павел'
];

const DESCRIPTIONS = [
  'Красивый закат на море',
  'Утренний кофе и круассан',
  'Прогулка по осеннему парку',
  'Ночной город в огнях',
  'Мой пушистый кот',
  'Вкусный ужин с друзьями',
  'Горный пейзаж',
  'Цветущая сакура',
  'Архитектурный шедевр',
  'Дождливый вечер у окна',
  'Счастливые моменты',
  'Минимализм в деталях',
  'Путешествие мечты',
  'Тёплое летнее утро',
  'Закат над городом',
  'Вдохновение природой',
  'Кофе и книги',
  'Море и пальмы',
  'Снежное утро',
  'Уютный домашний вечер',
  'Встреча с друзьями',
  'Необычный ракурс',
  'Магия момента',
  'Спокойствие и гармония',
  'Яркие эмоции'
];

function generateComment() {
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

function generateComments() {
  const commentsCount = getRandomInteger(0, 30);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments.push(generateComment());
  }

  return comments;
}

function generatePhotos() {
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

generatePhotos();
