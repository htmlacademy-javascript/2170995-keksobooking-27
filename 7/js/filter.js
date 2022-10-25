const mapForm = document.querySelector('.map__filters');

const getMapFilterDisabled = () => {
  mapForm.classList.add('map__filters--disabled');
  const mapFilters = mapForm.querySelectorAll('map__filter');
  mapFilters.forEach((mapFilter) => {
    mapFilter.disabled = true;
  });
};

const getMapFilterOn = () => {
  mapForm.classList.remove('map__filters--disabled');
  const mapFilters = mapForm.querySelectorAll('map__filter');
  mapFilters.forEach((mapFilter) => {
    mapFilter.disabled = false;
  });
};

export {getMapFilterDisabled, getMapFilterOn};
