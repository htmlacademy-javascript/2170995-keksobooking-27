import {TYPES} from './popup.js';

const adForm = document.querySelector('.ad-form');
const submitButton = adForm.querySelector('.ad-form__submit');
const adFormReset = adForm.querySelector('.ad-form__reset');

const typeOfHousing = adForm.querySelector('[name="type"]');
const price = adForm.querySelector('[name="price"]');

const room = adForm.querySelector('[name="rooms"]');
const capacity = adForm.querySelector('[name="capacity"]');
const roomOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};
const capacityOption = {
  '1': ['1', '2', '3'],
  '2': ['2', '3'],
  '3': ['3'],
  '0': ['100'],
};

const checkInTime = adForm.querySelector('[name="timein"]');
const checkOutTime = adForm.querySelector('[name="timeout"]');

const adress = adForm.querySelector('[name="address"]');
const priceSliderElement = document.querySelector('.ad-form__slider');

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
  return 'Выберите другое количество мест';
}

function getCapacityErrorMessage () {
  return 'Выберите другое количество комнат';
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
const setAddresValue = ({lat, lng}) => {
  adress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

adress.readOnly = true;

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

// Блокировка \ разблокировка кнопки submit
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Отправить';
};

// Сброс формы
const resetForm = () => {
  adForm.reset();
  priceSliderElement.noUiSlider.set(price.value);
  price.value = TYPES[typeOfHousing.value].minPrice;
};

// Слушатель для кнопки 'reset'
const setOnResetClick = (cb) => {
  adFormReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    cb();
  });
};

//  Слушатель для отправки формы
const setOnFormSubmit = (cb) => {
  adForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(evt.target));
      unblockSubmitButton();
    }
  });
};

export {
  getAdFormDisabled,
  getAdFormOn,
  setAddresValue,
  resetForm,
  setOnFormSubmit,
  setOnResetClick
};
