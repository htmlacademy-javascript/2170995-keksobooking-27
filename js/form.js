const adForm = document.querySelector('.ad-form');
// Pristine

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
});

const room = adForm.querySelector('[name="rooms"]');
const capacity = adForm.querySelector('[name="capacity"]');
const roomOption = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 1 гостя', 'для 2 гостей'],
  '3 комнаты': ['для 1 гостя', 'для 2 гостей', 'для 3 гостей'],
  '100 комнат': ['не для гостей'],
};
const capacityOption = {
  'для 1 гостя': ['1 комната', '2 комнаты', '3 комнаты'],
  'для 2 гостей': ['2 комнаты', '3 комнаты'],
  'для 3 гостей': ['3 комнаты'],
  'не для гостей': ['100 комнат'],
};

function validateRoom() {
  return roomOption[room.value].includes(capacity.value);
}

function validateCapacity() {
  return capacityOption[capacity.value].includes(room.value);
}

function getRoomErrorMessage () {
  return `
    ${room.value}
    ${capacity.value}
    ${room.value !== '1 комната' ? 'не подходят' : 'не подходит'}
  `;
}

function getCapacityErrorMessage () {
  return `
  ${capacity.value}
  ${room.value}
  ${room.value !== '1 комната' ? 'не подходят' : 'не подходит'}
  `;
}

pristine.addValidator(room, validateRoom, getRoomErrorMessage);
pristine.addValidator(capacity, validateCapacity, getCapacityErrorMessage);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


// Функции для блокировки - разблокировки форм
const getAdFormDisabled = () => {
  adForm.classList.add('ad-form--disabled');
  const fieldsets = adForm.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const getAdFormOn = () => {
  adForm.classList.remove('ad-form--disabled');
  const fieldsets = adForm.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

export {getAdFormDisabled, getAdFormOn};

