const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.querySelector('body');

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onErrorButtonClick = () => {
  hideMessage();
};

const onOverlayClick = () => {
  hideMessage();
};

const onMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const showSuccessMessage = () => {
  const successMessageElement = successMessageTemplate.cloneNode(true);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onOverlayClick);
  bodyElement.append(successMessageElement);
  bodyElement.style.overflow = 'hidden';
};

const showErrorMessage = () => {
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  document.addEventListener('keydown', onMessageEscKeydown);
  errorMessageElement.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  bodyElement.append(errorMessageElement);
  bodyElement.style.overflow = 'hidden';
};

function hideMessage () {
  const messageElement =
    document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onOverlayClick);
  bodyElement.style.overflow = 'auto';
}

export {
  showSuccessMessage,
  showErrorMessage
};
