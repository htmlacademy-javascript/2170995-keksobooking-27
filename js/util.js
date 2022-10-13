// Источники: developer.mozilla.org
// Рандомайзер для целых чисел
const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (typeof min !== 'number' || typeof max !== 'number') {
    return NaN;
  }
  if (min < 0 || max < 0) {
    return NaN;
  }
  if (max <= min) {
    const replacement = max;
    max = min;
    min = replacement;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//  рандомайзер для чисел с плавающей точкой
const getRandomFloat = (min, max, numberSigns = 1) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (typeof min !== 'number' || typeof max !== 'number' || typeof numberSigns !== 'number') {
    return NaN;
  }
  if (min < 0 || max < 0 || numberSigns < 0) {
    return NaN;
  }
  if (max <= min) {
    const replacement = max;
    max = min;
    min = replacement;
  }
  const result = Math.random() * (max - min) + min;
  return +result.toFixed(numberSigns);
};

// Функция рандомайзер для массивов
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomInteger};
export {getRandomFloat};
export {getRandomArrayElement};
