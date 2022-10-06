// Источники: developer.mozilla.org
function getRandomInteger(min, max) {
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
}

function getRandomFloat(min, max, numberSigns = 1) {
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
}

getRandomInteger(0, 2);
getRandomFloat(100, 200, 3);
