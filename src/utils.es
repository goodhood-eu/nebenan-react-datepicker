import getDaysInMonth from 'date-fns/getDaysInMonth';
import formatDate from 'date-fns/format';

export const pad = (number, digits = 2) => String(number).padStart(digits, 0);
export const arrayOf = (number) => Array.from(new Array(number)).map((_, index) => index);

export const toDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-').map((item) => parseInt(item, 10));
  return new Date(year, month - 1, day);
};

export const getMonth = (date) => new Date(date.getFullYear(), date.getMonth());

export const getISOMonth = (current) => (
  formatDate(current, 'yyyy-MM')
);

export const getISODate = (date) => formatDate(date, 'yyyy-MM-dd');

export const getMonthLabel = (date, locale) => {
  const { monthLabels } = locale;
  return `${monthLabels[date.getMonth()]} ${date.getFullYear()}`;
};

export const getMonthDetails = (date) => {
  const days = getDaysInMonth(date);
  const day = date.getDay();
  const offset = day === 0 ? 6 : day - 1;
  return { date, days, offset };
};
