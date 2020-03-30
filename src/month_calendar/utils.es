import addMonths from 'date-fns/addMonths';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import formatDate from 'date-fns/format';

export const getMonth = (string) => {
  const [year, month] = string.split('-').map((item) => parseInt(item, 10));
  return new Date(year, month - 1);
};

export const getMonthString = (current, diff = 0) => (
  formatDate(current ? addMonths(getMonth(current), diff) : new Date(), 'yyyy-MM')
);

export const isMonthInYearRange = (month, yearRange) => {
  let upperEnd;
  let lowerEnd;

  if (Array.isArray(yearRange)) {
    upperEnd = yearRange[1];
    lowerEnd = yearRange[0];
  } else if (Number.isInteger(yearRange)) {
    const currentYear = new Date().getFullYear();

    upperEnd = currentYear + yearRange + 1;
    lowerEnd = currentYear - yearRange;
  } else {
    return true;
  }

  const year = parseInt(month.split('-')[0], 10);

  return year >= lowerEnd && year < upperEnd;
};

const getISODate = (date) => {
  if (date instanceof Date) return formatDate(date, 'yyyy-MM-dd');
  return date;
};

export const isBefore = (dateA, dateB) => {
  return getISODate(dateA) < getISODate(dateB);
};

export const isAfter = (dateA, dateB) => {
  return getISODate(dateA) > getISODate(dateB);
};

export const getMonthLabel = (string, locale) => {
  const date = getMonth(string);
  const { modules: { calendar: { months } } } = locale;
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const getMonthDetails = (string) => {
  const date = getMonth(string);
  const days = getDaysInMonth(date);
  const day = date.getDay();
  const offset = day === 0 ? 6 : day - 1;
  return { date, days, offset };
};

export const getToday = () => formatDate(new Date(), 'yyyy-MM-dd');
