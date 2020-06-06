export const generateRandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const removeItemFromArray = (arr, pos) => {
  return arr.filter((_, index) => index !== pos);
};

export const shuffleArray = arr => {
  const arrCopy = arr.slice();
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arrCopy[i];
    arrCopy[i] = arrCopy[j];
    arrCopy[j] = temp;
  }
  return arrCopy;
};

export const roundNumber = (number, decimalPlaces = 2) => {
  return +(
    Math.round(number * 100 + `e+${decimalPlaces}`) + `e-${decimalPlaces}`
  );
};

export const toProperCase = word => {
  return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
};
