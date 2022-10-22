import {getRandomInteger} from './util.js';
import {getRandomFloat} from './util.js';
import {getRandomArrayElement} from './util.js';

const OFFERS_COUNT = 1;

const titles = [
  'Комфортный номер',
  'Уютная квартира',
  'Большой дом',
  'Хостел у моря',
  'Домик в горах',
  'Квартира студия',
  'Однушка',
  'Дом',
  'Дворец',
];

const prices = {
  MIN: 1,
  MAX: 10000,
};

const types = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const rooms = {
  MIN: 1,
  MAX: 10,
};

const guests = {
  MIN: 1,
  MAX: 20,
};

const times = [
  '12:00',
  '13:00',
  '14:00',
];

const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const descriptions = [
  'Светлое, просторное помещение, в нем много воздуха и солнца.',
  'Расположено на 8 этаже высотного здания.',
  'Для компании до 8 рабочих мест.',
  'Рядом садик и магазин.',
  'Полностью мебелированна',
  'Сдаю небольшую студию в центре города.',
  'Вся инфраструктура рядом.',
  'Продам новый 2-х комнатный, одноэтажный дом',
];

const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LOCATIONS = {
  MIN_LATITUDE : 35.65,
  MAX_LATITUDE : 35.7,
  MIN_LONGITUDE : 139.7,
  MAX_LONGITUDE : 139.8,
};

const createsAuthorData = (index) => ({
  avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`
});

// Функция рандомайзер для location
const getRandomLatitude = () =>
  getRandomFloat(LOCATIONS.MIN_LATITUDE, LOCATIONS.MAX_LATITUDE, 5);

const getRandomLongitude = () =>
  getRandomFloat(LOCATIONS.MIN_LONGITUDE, LOCATIONS.MAX_LONGITUDE, 5);

// Функция рандомайзер для offers
const createsOfferData = () => ({
  title: getRandomArrayElement(titles),
  adress: `${getRandomLatitude()}, ${getRandomLongitude()}`,
  price: getRandomInteger(prices.MIN, prices.MAX),
  type: getRandomArrayElement(types),
  rooms: getRandomInteger(rooms.MIN, rooms.MAX),
  guests: getRandomInteger(guests.MIN, guests.MAX),
  checkin: getRandomArrayElement(times),
  checkout: getRandomArrayElement(times),
  features: features.slice(0, getRandomInteger(0, features.length)),
  description: getRandomArrayElement(descriptions),
  photos: Array.from({length: getRandomInteger(0, 10)}, () => getRandomArrayElement(photos)),
});

const createsLocationData = () => ({
  lat: getRandomLatitude(),
  lng: getRandomLongitude(),
});

const createsOffer = (index) => ({
  author: createsAuthorData(index),
  offer: createsOfferData(),
  location: createsLocationData(),
});

const getOffers = () =>
  Array.from({ length: OFFERS_COUNT }, (_, offerIndex) => createsOffer(offerIndex + 1));

getOffers();

export {getOffers};
