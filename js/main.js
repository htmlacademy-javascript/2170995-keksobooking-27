import {getOffers} from './data.js';
import {createCard} from './popup.js';
import {getAdFormDisabled, getAdFormOn} from './form.js';
import {getMapFilterDisabled, getMapFilterOn} from './filter.js';

getOffers();
// eslint-disable-next-line no-unused-expressions
createCard;
getAdFormDisabled();
getAdFormOn();
getMapFilterDisabled();
getMapFilterOn();
