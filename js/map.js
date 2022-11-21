import { renderCard } from './popup.js';

const ZOOM_MAP = 12;

const map = L.map('map-canvas');

// Главная метка (вид)
const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Главная метка, отрисовка
const mainMarker = L.marker(
  {
    lat: 0,
    lng: 0,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

// Метка для объявлений (вид)
const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Отображение карты и гл. метки
const initMap = (coordinate) => {
  map.setView(coordinate, ZOOM_MAP);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.setLatLng(coordinate);
  mainMarker.addTo(map);
};

// отслеживание коорднитат при движении гл. Метки
const setOnMainPinMove = (cb) => {
  mainMarker.on('move', (evt) => cb(evt.target.getLatLng()));
};

// Создание слоя с группой меток
const markerGroup = L.layerGroup().addTo(map);

// Создание меток с объявлениями
const createPinMarker = (data) => {
  const pinMarker = L.marker(
    data.location, {
      icon: pinIcon,
    },
  );

  pinMarker
    .addTo(markerGroup)
    .bindPopup(
      renderCard(data), // привязывает балун-объявление к метке
    );
};

// Очищение слоя с метками объявлений
const clearMarker = () => markerGroup.clearLayers();

// проверка что карта загрузилась
const setOnMapLoad = (cb) => {
  map.on('load', cb);
};

// Принимаем координаты гл. Метки
const setMainPinCoordinate = (coordinate) => {
  mainMarker.setLatLng(coordinate);
};

export {
  initMap,
  setOnMainPinMove,
  createPinMarker,
  clearMarker,
  setOnMapLoad,
  setMainPinCoordinate
};
