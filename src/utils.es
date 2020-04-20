import getDaysInMonth from 'date-fns/getDaysInMonth';

export const arrayOf = (number) => Array.from(new Array(number)).map((_, index) => index);
export const getMonth = (date) => new Date(date.getFullYear(), date.getMonth());

export const getMonthLabel = (date, locale) => {
  const { monthLabels } = locale;
  return `${monthLabels[date.getMonth()]} ${date.getFullYear()}`;
};

export const dateToArray = (date) => [date.getFullYear(), date.getMonth(), date.getDate()];

export const getDateArrayDiff = (valueA, valueB) => {
  for (let i = 0; i < 3; i += 1) {
    const diff = valueB[i] - valueA[i];
    if (diff) return diff;
  }
  return 0;
};

export const getMonthDetails = (date) => {
  const days = getDaysInMonth(date);
  const day = date.getDay();
  const offset = day === 0 ? 6 : day - 1;
  return { date, days, offset };
};
