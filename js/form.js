const adForm = document.querySelector('.ad-form');

const getAdFormDisabled = () => {
  adForm.classList.add('ad-form--disabled');
  const fieldsets = adForm.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const getAdFormOn = () => {
  adForm.classList.remove('ad-form--disabled');
  const fieldsets = adForm.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

export {getAdFormDisabled, getAdFormOn};

