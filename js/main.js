import { getMapFilterDisabled, getMapFilterOn, checkAllFilters, changeFilters, resetFilter } from './filter.js';
import { getAdFormDisabled, getAdFormOn, setAddresValue, resetForm, setOnFormSubmit, setOnResetClick } from './form.js';
import { initMap, setOnMainPinMove, setOnMapLoad, setMainPinCoordinate } from './map.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { getData, sendData } from './server.js';
import { debounce, showAlert } from './util.js';

const START_COORDINATE = {
  lat: 35.68518,
  lng: 139.768066
};

const TIMEOUT_DELAY = 500;

// сброс координат
const resetCoordinate = () => {
  setMainPinCoordinate(START_COORDINATE);
  setAddresValue(START_COORDINATE);
};

// передача данных
const onGetDataSuccess = (offers) => {
  getMapFilterOn();
  checkAllFilters(offers);
  changeFilters(debounce(() => checkAllFilters(offers), TIMEOUT_DELAY));
  setOnResetClick(() => {
    resetCoordinate();
    checkAllFilters(offers);
  });
};

// действия после отправки формы
const onSendDataSuccess = () => {
  resetForm();
  resetFilter();
  getData((offers) => checkAllFilters(offers));
  resetCoordinate();
  showSuccessMessage();
};

// успешная загрузка формы
setOnMapLoad (() => {
  setOnMainPinMove(setAddresValue);
  resetCoordinate();
  getAdFormOn();
});

// отправка формы
setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});

getAdFormDisabled();
getMapFilterDisabled();
initMap(START_COORDINATE);
getData(onGetDataSuccess, showAlert);
