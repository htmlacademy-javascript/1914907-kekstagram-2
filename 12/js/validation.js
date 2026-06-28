const MAX_COMMENTS_LENGTH = 140;
const MAX_TAGS_COUNT = 5;
const MAX_TAG_LENGTH = 20;
const VALID_TAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const validateTags = (value) => {
  if (!value.trim()) {
    return [];
  }
  const tags = value.trim().split(/\s+/);
  if (tags.length > MAX_TAGS_COUNT) {
    return [`Нельзя указать больше ${MAX_TAGS_COUNT} хэштегов`];
  }
  for (const tag of tags) {
    if (!tag.startsWith('#')) {
      return ['Хэштег должен начинаться с #'];
    }
    if (tag.length > MAX_TAG_LENGTH) {
      return [`Максимальная длина хэштега ${MAX_TAG_LENGTH} символов`];
    }
    if (!VALID_TAG_PATTERN.test(tag)) {
      return ['Хэштег содержит недопустимые символы'];
    }
  }
  const lowerTags = tags.map((tag) => tag.toLowerCase());
  if (lowerTags.length !== new Set(lowerTags).size) {
    return ['Хэштеги не должны повторяться'];
  }
  return [];
};

const validateDescription = (value) => {
  if (value.length > MAX_COMMENTS_LENGTH) {
    return [`Длина комментария не должна превышать ${MAX_COMMENTS_LENGTH} символов`];
  }
  return [];
};

const showError = (input, errors) => {
  const wrapper = input.closest('.img-upload__field-wrapper');
  const oldError = wrapper.querySelector('.pristine-error');
  if (oldError) {
    oldError.remove();
  }
  if (errors.length > 0) {
    wrapper.classList.add('img-upload__field-wrapper--error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'pristine-error img-upload__field-wrapper--error';
    errorDiv.textContent = errors.join(', ');
    wrapper.appendChild(errorDiv);
  } else {
    wrapper.classList.remove('img-upload__field-wrapper--error');
  }
};

const validateForm = () => {
  const tagErrors = validateTags(hashtagsInput.value);
  const descErrors = validateDescription(descriptionInput.value);
  showError(hashtagsInput, tagErrors);
  showError(descriptionInput, descErrors);
  return tagErrors.length === 0 && descErrors.length === 0;
};

hashtagsInput.addEventListener('input', () => {
  const errors = validateTags(hashtagsInput.value);
  showError(hashtagsInput, errors);
});

descriptionInput.addEventListener('input', () => {
  const errors = validateDescription(descriptionInput.value);
  showError(descriptionInput, errors);
});

export { validateTags, validateDescription, validateForm };
