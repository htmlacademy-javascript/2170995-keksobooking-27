import {getOffers} from './data.js';
import {getAdFormDisabled, getAdFormOn, setAddresValue} from './form.js';
import {getMapFilterDisabled, getMapFilterOn} from './filter.js';
import {initMap, setOnMapLoad, setOnMainPinMove, setAdPins} from './map.js';


const START_COORDINATE = {
  lat: 35.68518,
  lng: 139.768066
};

const offers = getOffers();

setOnMapLoad (() => {
  setOnMainPinMove(setAddresValue);
  setAddresValue(START_COORDINATE);
  getAdFormOn();
  setAdPins(offers);
  getMapFilterOn();
});

getAdFormDisabled();
getMapFilterDisabled();
initMap(START_COORDINATE);
