const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

const uploadInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const preview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

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
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';
};

uploadInput.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
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

export { closeEditor, showEditor };
