import {createOffers} from './popup.js';

const OFFERS_COUNT = 10;
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);
const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

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
const initMap = (coordinate) => {
  map.setView(coordinate, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.setLatLng(coordinate);
  mainMarker.addTo(map);
};


const renderOffers = (offers) => {
  offers.forEach((offer) => {
    const marker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng,
      },
      {
        icon: pinIcon,
      },
    );
    marker.addTo(markerGroup).bindPopup(createOffers(offer));
  });
};

const setAdPins = (offers) => {
  markerGroup.clearLayers();
  renderOffers(offers.slice(0, OFFERS_COUNT));
};

const setOnMapLoad = (cb) => {
  map.on('load', cb);
};

const setOnMainPinMove = (cb) => {
  mainMarker.on('move', (evt) => cb(evt.target.getLatLng()));
};

export {initMap, setOnMapLoad, setOnMainPinMove, setAdPins};
