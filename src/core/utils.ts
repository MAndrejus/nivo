export const MOBILE_BREAKPOINT = 576;

export function ensureContainerElement(containerId: string): HTMLElement {
  const container = document.getElementById(containerId);

  if (container) return container;

  const element = document.createElement('div');

  element.setAttribute('id', containerId);

  return document.body.appendChild(element);
}

const uidPrefix = 'component-unique-id';
let idCounter = 0;

export function getUniqueComponentId(): string {
  return `${uidPrefix}--${idCounter++}`;
}

export function setValueBasedOnDevice<T>(desktopValue: T, mobileValue: T): T {
  return window.innerWidth >= MOBILE_BREAKPOINT ? desktopValue : mobileValue;
}

export const numberWithCommas = (number: number, decimals?: number) => {
  return number.toFixed(decimals || 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const abbreviateNumber = (number: number, decimalPlaces = 2) => {
  const abbreviations: string[] = ['', 'K', 'M', 'B', 'T'];
  const i = 0 === number ? number : Math.floor(Math.log(number) / Math.log(1000));
  const result = parseFloat((number / Math.pow(1000, i)).toFixed(decimalPlaces));
  return `$${result}${abbreviations[i]}`;
};

export const callFakeApi = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000 + Math.floor(Math.random() * 2000));
  });
};

export const shuffle = (array: number[]) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) return text.slice(0, maxLength) + '\u2026';
  return text;
};

export const valueOr = (val: string | undefined, naText: string): string => val || naText;

export const printProcFromFraction = (value: number, fractionDigits = 2): string =>
  numberWithCommas(value * 100, fractionDigits);

export const roundValue = (
  value: number,
  options: { prefix?: string; suffix?: string; decimals?: number },
  alwaysInDecimals = false
) => {
  const { prefix = '', suffix = '', decimals } = options;
  const hasDecimals = value % 1 !== 0;
  if (!alwaysInDecimals && (!decimals || !hasDecimals)) return `${prefix}${value}${suffix}`;
  return `${prefix}${value.toFixed(decimals)}${suffix}`;
};

export const copyToClipboard = (text: string) => {
  const elem = document.createElement('textarea');
  elem.value = text;
  document.body.appendChild(elem);
  elem.setAttribute('value', text);
  elem.select();
  document.execCommand('copy');
  document.body.removeChild(elem);
};

export const stringSort = (a: string | null, b: string | null) => {
  const aValue = a ? a.toLowerCase() : '';
  const bValue = b ? b.toLowerCase() : '';

  return aValue > bValue ? 1 : -1;
};

export const testSocialSecurityNumber = (value: string): boolean => {
  const letters = value.split('');
  // Check consecutive numbers
  const matches = letters.filter((letter) => value[0] === letter);
  if (matches.length === letters.length) return false;
  // Check incrementing numbers
  const increments = letters.filter((letter, i) => {
    const number = parseInt(letter);
    const nextNumber = parseInt(letters[i + 1]);
    return nextNumber && number + 1 === nextNumber;
  });
  if (increments.length === letters.length - 1) return false;
  // Check if all symbols are numbers
  if (!/^\d+$/.test(value)) return false;
  // Check length
  return letters.length === 9;
};

export const toFixedWithoutRounding = (
  value: number,
  options: { prefix?: string; suffix?: string; decimals?: number; multiply: boolean }
) => {
  const { decimals = 2, prefix = '', suffix = '', multiply = true } = options;
  let newValue = 0;

  if (isNaN(value)) return `${prefix}${newValue.toFixed(decimals)}${suffix}`;

  const stringValue = value.toString();

  if (/e-/.test(stringValue)) {
    return `${prefix}${newValue.toFixed(decimals)}${suffix}`;
  }

  if (/e\+/.test(stringValue)) {
    newValue = value;
    return `${prefix}${newValue.toFixed(decimals)}${suffix}`;
  }

  if (stringValue.indexOf('.') === -1) {
    newValue = multiply ? value * 100 : value;
    return `${prefix}${newValue.toFixed(decimals)}${suffix}`;
  }

  const splittedValues = stringValue.split('.');
  const splittedValueAfterDotLength = splittedValues[1]?.length || 0;

  newValue = value;

  if (multiply) {
    newValue =
      Math.round(value * Math.pow(10, splittedValueAfterDotLength)) /
      Math.pow(10, splittedValueAfterDotLength - decimals);
  }

  const floatNumberRegExp = new RegExp(`^-?\\d+(?:\\.\\d{0,${decimals}})?`, 'gi');
  const matchedValue = newValue.toString().match(floatNumberRegExp);

  if (!matchedValue?.[0]) return `${prefix}${newValue.toFixed(decimals)}${suffix}`;

  newValue = Number(matchedValue[0]);

  return `${prefix}${newValue.toFixed(decimals)}${suffix}`;
};

export const addClassToHtmlAndBody = (className: string) => {
  document.getElementsByTagName('html')[0].classList.add(className);
  document.body.classList.add(className);
};
