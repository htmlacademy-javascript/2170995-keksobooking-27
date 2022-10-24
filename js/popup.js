import {getOffers} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const map = document.querySelector('#map-canvas');

const createCard = getOffers();

const similarListFragment = document.createDocumentFragment();

const TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const renderDescription = (cardElement, description) => {
  const descriptionElement = cardElement.querySelector('.popup__description');
  if (description && description.length) {
    descriptionElement.textContent = description;
  } else {
    descriptionElement.remove();
  }
};

const renderFeatures = (cardElement, features) => {
  const fiaturesList = cardElement.querySelector('.popup__features');
  const fiaturesListItems = fiaturesList.querySelectorAll('.popup__feature');

  fiaturesListItems.forEach((listItem) => {
    const isNecessary = features.some(
      (feature) => listItem.classList.contains(`popup__feature--${ feature }`),
    );

    if (!isNecessary) {
      listItem.remove();
    }
  });
};

const createPhoto = (photo, title) => {
  const photoElement = document.createElement('img');
  photoElement.classList.add('popup__photo');
  photoElement.src = photo;
  photoElement.alt = title;
  photoElement.width = '45';
  photoElement.height = '40';

  return photoElement;
};

const renderPhoto = (cardElement, photos, title) => {
  const photoList = cardElement.querySelector('.popup__photos');
  if (photos && photos.length) {
    photoList.innerHTML = '';
    photos.forEach((photo) => {
      const photoElement = createPhoto(photo, title);
      photoList.append(photoElement);
    });
  } else {
    photoList.remove();
  }
};

createCard.forEach (({ author, offer }) => {
  const cardTemplateElement = cardTemplate.cloneNode(true);
  cardTemplateElement.querySelector('.popup__avatar').src = author.avatar;
  cardTemplateElement.querySelector('.popup__title').textContent = offer.title;
  cardTemplateElement.querySelector('.popup__text--address').textContent = offer.adress;
  cardTemplateElement.querySelector('[data-price]').textContent = offer.price;
  cardTemplateElement.querySelector('.popup__type').textContent = TYPE[offer.type];
  cardTemplateElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardTemplateElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  renderDescription(cardTemplateElement, offer.description);
  renderFeatures(cardTemplateElement, offer.features);
  renderPhoto(cardTemplateElement, offer.photos, offer.title);
  similarListFragment.appendChild(cardTemplateElement);
  return cardTemplateElement;

});

map.appendChild(similarListFragment);
export {createCard};
