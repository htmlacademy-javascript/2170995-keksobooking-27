import { createPinMarker, clearMarker } from './map.js';

const DEFAULT_VALUE = 'any';
const OFFERS_COUNT = 10;

const priceMapFilter = {
  low: {
    start: 0,
    end: 10000,
  },
  middle: {
    start: 10000,
    end: 50000,
  },
  high: {
    start: 50000,
    end: 1000000,
  },
};

const filterForm = document.querySelector('.map__filters');
const typeFilter = filterForm.querySelector('#housing-type');
const priceFilter = filterForm.querySelector('#housing-price');
const roomsFilter = filterForm.querySelector('#housing-rooms');
const guestsFilter = filterForm.querySelector('#housing-guests');
const featuresFilter = filterForm.querySelectorAll('.map__checkbox');

// отключение фильтра
const getMapFilterDisabled = () => {
  filterForm.classList.add('map__filters--disabled');
  const mapFilters = filterForm.querySelectorAll('map__filter');
  mapFilters.forEach((mapFilter) => {
    mapFilter.disabled = true;
  });
};

// включение фильтра
const getMapFilterOn = () => {
  filterForm.classList.remove('map__filters--disabled');
  const mapFilters = filterForm.querySelectorAll('map__filter');
  mapFilters.forEach((mapFilter) => {
    mapFilter.disabled = false;
  });
};

const checkType = (offer) => typeFilter.value === offer.offer.type || typeFilter.value === DEFAULT_VALUE;

const checkPrice = (offer) => priceFilter.value === DEFAULT_VALUE || (offer.offer.price >= priceMapFilter[priceFilter.value].start && offer.offer.price <= priceMapFilter[priceFilter.value].end);

const checkRooms = (offer) => offer.offer.rooms === +roomsFilter.value || roomsFilter.value === DEFAULT_VALUE;

const checkGuests = (offer) => offer.offer.guests === +guestsFilter.value || guestsFilter.value === DEFAULT_VALUE;

const checkFeatures = (offer) => Array.from(featuresFilter)
  .every((filterFeature) => {
    if (!filterFeature.checked) {
      return true;
    }
    if (!offer.offer.features) {
      return false;
    }
    return offer.offer.features.includes(filterFeature.value);
  });

// Отфильтрованные объявления
const checkAllFilters = (offers) => {
  const filteredData = [];
  for (let i = 0; i < offers.length; i++) {
    const offer = offers[i];
    if (
      checkType(offer) &&
      checkPrice(offer) &&
      checkRooms(offer) &&
      checkGuests(offer) &&
      checkFeatures(offer)
    ) {
      createPinMarker(offer);
      filteredData.push(offer);
    }
    if (filteredData.length === OFFERS_COUNT) {
      break;
    }
  }
  return filteredData;
};

// Перерисовка карты
const changeFilters = (cb) => {
  filterForm.addEventListener('change', () => {
    clearMarker();
    cb();
  });
};

const resetFilter = () => {
  filterForm.reset();
  clearMarker();
};

export {
  getMapFilterDisabled,
  getMapFilterOn,
  checkAllFilters,
  changeFilters,
  resetFilter
};
