const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const TYPES = {
  bungalow: {ru: 'Бунгало', minPrice: 0},
  flat: {ru: 'Квартира', minPrice: 1000},
  hotel: {ru: 'Отель', minPrice: 3000},
  house: {ru: 'Дом', minPrice: 5000},
  palace: {ru: 'Дворец', minPrice: 10000},
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

const createOffers = ({ author, offer }) => {
  const cardTemplateElement = cardTemplate.cloneNode(true);
  cardTemplateElement.querySelector('.popup__avatar').src = author.avatar;
  cardTemplateElement.querySelector('.popup__title').textContent = offer.title;
  cardTemplateElement.querySelector('.popup__text--address').textContent = offer.adress;
  cardTemplateElement.querySelector('[data-price]').textContent = offer.price;
  cardTemplateElement.querySelector('.popup__type').textContent = TYPES[offer.type].ru;
  cardTemplateElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardTemplateElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  renderDescription(cardTemplateElement, offer.description);
  renderFeatures(cardTemplateElement, offer.features);
  renderPhoto(cardTemplateElement, offer.photos, offer.title);

  return cardTemplateElement;

};
export {createOffers};
export {TYPES};
