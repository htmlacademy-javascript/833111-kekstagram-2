export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

export function getRandomMessage() {
  return messages[getRandomInt(0, messages.length - 1)];
}

const names = ['Артём', 'Мария', 'Иван', 'Ольга', 'Дмитрий', 'Анна', 'Сергей', 'Елена', 'Алексей', 'Татьяна'];

export function getRandomName() {
  return names[getRandomInt(0, names.length - 1)];
}

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS = 5;

export const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const errors = [];

  if (!value.trim()) {
    return { isValid: true };
  }

  const rules = [
    {
      check: hashtags.some((item) => item === '#'),
      error: 'Хэштэг не может состоять только из одной решётки'
    },
    {
      check: hashtags.some((item) => item[0] !== '#'),
      error: 'Хэштэг должен начинаться с решётки'
    },
    {
      check: hashtags.some((item) => item.slice(1).includes('#')),
      error: 'Хэштэги должны разделяться пробелами'
    },
    {
      check: hashtags.some((item) => item.length > MAX_HASHTAG_LENGTH),
      error: `Максимальная длина хэштега - ${MAX_HASHTAG_LENGTH} символов`
    },
    {
      check: hashtags.length > MAX_HASHTAGS,
      error: `Не более ${MAX_HASHTAGS} хэштегов`
    },
    {
      check: hashtags.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Недопустимые символы в хэштеге'
    },
    {
      check: hashtags.some((item, index, array) => array.indexOf(item) !== index),
      error: 'Хэштеги не должны повторяться'
    }
  ];

  for (const rule of rules) {
    if (rule.check) {
      errors.push(rule.error);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const getHashtagError = (value) => {
  const { errors } = validateHashtags(value);
  return errors || null;
};

export function debounce(callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
