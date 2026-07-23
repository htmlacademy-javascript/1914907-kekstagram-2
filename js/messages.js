const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

let isMessageOpen = false;

const showMessage = (template) => {
  const message = template.content.cloneNode(true);
  document.body.append(message);
  isMessageOpen = true;

  const closeMessage = () => {
    const currentMessage = document.querySelector('.success, .error');
    if (currentMessage) {
      currentMessage.remove();
    }
    document.removeEventListener('keydown', onEscKeydown);
    isMessageOpen = false;
  };

  function onEscKeydown(evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  }

  document.addEventListener('keydown', onEscKeydown);

  const onOverlayClick = (evt) => {
    if (evt.target === message) {
      closeMessage();
    }
  };

  message.addEventListener('click', onOverlayClick);

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

export { showSuccessMessage, showErrorMessage, isMessageOpen };
