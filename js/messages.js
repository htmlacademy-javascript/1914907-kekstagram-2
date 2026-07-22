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

  document.addEventListener('keydown', onEscKeydown);

  message.addEventListener('click', (evt) => {
    if (evt.target === message || evt.target.closest('.success, .error')) {
      closeMessage();
    }
  });

  setTimeout(() => {
    const successButton = document.querySelector('.success__button');
    const errorButton = document.querySelector('.error__button');

    if (successButton) {
      successButton.addEventListener('click', closeMessage);
    }

    if (errorButton) {
      errorButton.addEventListener('click', closeMessage);
    }
  }, 0);
};

const showSuccessMessage = () => {
  showMessage(successTemplate);
};

const showErrorMessage = () => {
  showMessage(errorTemplate);
};

export { showSuccessMessage, showErrorMessage };
