import {getAdFormDisabled, getAdFormOn, setAddresValue, resetForm, setOnFormSubmit, setOnResetClick} from './form.js';
import {getMapFilterDisabled, getMapFilterOn} from './filter.js';
import {initMap, setOnMapLoad, setOnMainPinMove, setAdPins, setMainPinCoordinate} from './map.js';
import {showErrorMessage, showSuccessMessage} from './message.js';
import {getData, sendData} from './server.js';
import {showAlert} from './util.js';

const START_COORDINATE = {
  lat: 35.68518,
  lng: 139.768066
};

const resetCoordinate = () => {
  setMainPinCoordinate(START_COORDINATE);
  setAddresValue(START_COORDINATE);
};

const onGetDataSuccess = (offers) => {
  setAdPins(offers);
  getMapFilterOn();
};

const onSendDataSuccess = () => {
  resetForm();
  resetCoordinate();
  showSuccessMessage();
};

setOnMapLoad (() => {
  setOnMainPinMove(setAddresValue);
  resetCoordinate();
  getAdFormOn();
});

setOnResetClick(resetCoordinate);

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});

getAdFormDisabled();
getMapFilterDisabled();
initMap(START_COORDINATE);
getData(onGetDataSuccess, showAlert);
