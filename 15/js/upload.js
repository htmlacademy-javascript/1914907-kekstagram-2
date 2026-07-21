import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const VALID_HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const preview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');
const form = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const showError = (input, message) => {
  const wrapper = input.closest('.img-upload__field-wrapper');
  let error = wrapper.querySelector('.pristine-error');
  if (!error) {
    error = document.createElement('div');
    error.className = 'pristine-error img-upload__field-wrapper--error';
    wrapper.appendChild(error);
  }
  error.textContent = message;
  wrapper.classList.add('img-upload__field-wrapper--error');
};

const clearError = (input) => {
  const wrapper = input.closest('.img-upload__field-wrapper');
  const error = wrapper.querySelector('.pristine-error');
  if (error) {
    error.remove();
  }
  wrapper.classList.remove('img-upload__field-wrapper--error');
};

const validateHashtags = (value) => {
  if (!value.trim()) {
    return '';
  }

  const tags = value.trim().split(/\s+/);

  if (tags.length > MAX_HASHTAGS) {
    return `Нельзя указать больше ${MAX_HASHTAGS} хэштегов`;
  }

  for (const tag of tags) {
    if (!tag.startsWith('#')) {
      return 'Хэштег должен начинаться с #';
    }

    if (tag.length > MAX_HASHTAG_LENGTH) {
      return `Максимальная длина хэштега ${MAX_HASHTAG_LENGTH} символов`;
    }

    if (!VALID_HASHTAG_PATTERN.test(tag)) {
      return 'Хэштег содержит недопустимые символы';
    }
  }

  const lowerTags = tags.map((tag) => tag.toLowerCase());
  const uniqueTags = new Set(lowerTags);
  if (lowerTags.length !== uniqueTags.size) {
    return 'Хэштеги не должны повторяться';
  }

  return '';
};

const validateDescription = (value) => {
  if (value.length > MAX_COMMENT_LENGTH) {
    return `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов`;
  }
  return '';
};

const resetForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  uploadInput.value = '';
  clearError(hashtagsInput);
  clearError(descriptionInput);
  submitButton.disabled = false;
};

const showEditor = (file) => {
  const reader = new FileReader();
  reader.onload = (evt) => {
    preview.src = evt.target.result;
    effectPreviews.forEach((element) => {
      element.style.backgroundImage = `url(${evt.target.result})`;
    });
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  };
  reader.readAsDataURL(file);
};

const closeEditor = () => {
  resetForm();
};

uploadInput.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  if (!file) {
    return;
  }
  const isValidType = FILE_TYPES.some((type) => file.name.toLowerCase().endsWith(type));
  if (isValidType) {
    showEditor(file);
  }
});

document.querySelector('#upload-cancel').addEventListener('click', closeEditor);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !overlay.classList.contains('hidden')) {
    const isInputFocused = document.activeElement.closest('.text__hashtags, .text__description');
    if (!isInputFocused) {
      closeEditor();
    }
  }
});

hashtagsInput.addEventListener('input', () => {
  const value = hashtagsInput.value;
  if (!value.trim()) {
    clearError(hashtagsInput);
    return;
  }
  const error = validateHashtags(value);
  if (error) {
    showError(hashtagsInput, error);
  } else {
    clearError(hashtagsInput);
  }
});

descriptionInput.addEventListener('input', () => {
  const value = descriptionInput.value;
  if (!value.trim()) {
    clearError(descriptionInput);
    return;
  }
  const error = validateDescription(value);
  if (error) {
    showError(descriptionInput, error);
  } else {
    clearError(descriptionInput);
  }
});

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const tagError = validateHashtags(hashtagsInput.value);
  const descError = validateDescription(descriptionInput.value);

  if (tagError) {
    showError(hashtagsInput, tagError);
  } else {
    clearError(hashtagsInput);
  }

  if (descError) {
    showError(descriptionInput, descError);
  } else {
    clearError(descriptionInput);
  }

  if (!tagError && !descError) {
    submitButton.disabled = true;
    const formData = new FormData(form);
    try {
      await sendPicture(formData);
      showSuccessMessage();
      resetForm();
    } catch {
      showErrorMessage();
      submitButton.disabled = false;
    }
  }
});

export { closeEditor, showEditor };
