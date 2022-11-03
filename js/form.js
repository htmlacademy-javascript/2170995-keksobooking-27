import {TYPES} from './popup.js';

const adForm = document.querySelector('.ad-form');

const typeOfHousing = adForm.querySelector('[name="type"]');
const price = adForm.querySelector('[name="price"]');

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

const checkInTime = adForm.querySelector('[name="timein"]');
const checkOutTime = adForm.querySelector('[name="timeout"]');

const adress = adForm.querySelector('[name="address"]');

// Pristine
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
},
true
);

// Валидация для кол-ва комнат и кол-ва мест
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


// Валидатор для типа жилья и цены
typeOfHousing.addEventListener('change', () => {
  price.min = TYPES[typeOfHousing.value].minPrice;
  price.placeholder = TYPES[typeOfHousing.value].minPrice;
});

function validatePrice() {
  return TYPES[typeOfHousing.value].minPrice <= price.value;
}

function getPriceErrorMessage () {
  if (price.value < TYPES[typeOfHousing.value].minPrice) {
    return `Минимальная цена от ${TYPES[typeOfHousing.value].minPrice}`;
  }
}

pristine.addValidator(price, validatePrice, getPriceErrorMessage);


// Синхронизация времени заезда/выезда
checkInTime.addEventListener('change', () => {
  checkOutTime.value = checkInTime.value;
});

checkOutTime.addEventListener('change', () => {
  checkInTime.value = checkOutTime.value;
});

// noUiSlider
const priceSliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(priceSliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: TYPES[typeOfHousing.value].minPrice,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return (value);
    },
  },
});


priceSliderElement.noUiSlider.on('update', () => {
  price.value = priceSliderElement.noUiSlider.get();
});


// обработчик адреса
const setAddresValue = (value) => {
  adress.value = value;
};

adress.readOnly = true;

//  Слушатель для отправки формы
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


export {getAdFormDisabled, getAdFormOn, setAddresValue};

