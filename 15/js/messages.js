const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

const showMessage = (template) => {
  const message = template.content.cloneNode(true);
  document.body.append(message);

  const closeMessage = () => {
    const currentMessage = document.querySelector('.success, .error');
    if (currentMessage) {
      currentMessage.remove();
    }
    document.removeEventListener('keydown', onEscKeydown);
  };

  function onEscKeydown(evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  }

  const successButton = message.querySelector('.success__button');
  const errorButton = message.querySelector('.error__button');

  if (successButton) {
    successButton.addEventListener('click', closeMessage);
  }

  if (errorButton) {
    errorButton.addEventListener('click', closeMessage);
  }

  document.addEventListener('keydown', onEscKeydown);

  message.addEventListener('click', (evt) => {
    if (evt.target === message) {
      closeMessage();
    }
  });
};

const showSuccessMessage = () => {
  showMessage(successTemplate);
};

const showErrorMessage = () => {
  showMessage(errorTemplate);
};

export { showSuccessMessage, showErrorMessage };
