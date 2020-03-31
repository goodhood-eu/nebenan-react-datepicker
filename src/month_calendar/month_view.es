import React from 'react';
import { arrayOf } from 'nebenan-helpers/lib/data';
import clsx from 'clsx';
import { formatNumber as pad } from 'nebenan-helpers/lib/formatters';
import { getMonthDetails, getToday, isAfter, isBefore } from './utils';

const DAYS_COUNT = 7;

const renderLabelsRow = (locale) => {
  const { firstDay, weekdayShortLabels } = locale;
  const labels = arrayOf(DAYS_COUNT).map((i) => {
    const key = i + firstDay > 6 ? 0 : i + firstDay;
    const className = clsx('c-datepicker-label', {
      'is-weekend': key === 6 || key === 0,
    });
    return <th key={key} className={className}>{weekdayShortLabels[key]}</th>;
  });
  return <tr>{labels}</tr>;
};

const renderMonth = ({ month, minDate, maxDate, selected, onCellClick }) => {
  const { days, offset } = getMonthDetails(month);

  const weeks = Math.ceil((days + offset) / DAYS_COUNT);
  const today = getToday();

  const renderWeek = (week) => {
    const shift = week * DAYS_COUNT;
    const isFirstWeek = week === 0;

    const items = arrayOf(DAYS_COUNT).map((day) => {
      const date = shift + day + 1 - offset;

      const key = `${month}-${pad(date)}`;

      const isBeforeMinDate = minDate ? isBefore(key, minDate) : false;
      const isAfterMaxDate = maxDate ? isAfter(key, maxDate) : false;

      const isDisabled = isBeforeMinDate || isAfterMaxDate;

      const isStartFiller = isFirstWeek && day < offset;
      const isEndFiller = date > days;

      const className = clsx('c-datepicker-cell', {
        'is-today': today === key,
        'is-selected': key === selected,
        'is-disabled': isDisabled,
        'is-interactive': !isDisabled && !isStartFiller && !isEndFiller,
      });

      let label;
      if (!isStartFiller && !isEndFiller) {
        const handleClick = onCellClick && !isDisabled ? onCellClick.bind(null, key) : null;
        label = <span className="c-datepicker-date" onClick={handleClick}>{date}</span>;
      }

      return <td key={date} className={className}>{label}</td>;
    });

    return <tr key={week}>{items}</tr>;
  };

  return arrayOf(weeks).map(renderWeek);
};

const MonthView = ({ locale, month, minDate, maxDate, selected, onCellClick }) => {
  const rows = renderMonth({ month, minDate, maxDate, selected, onCellClick });
  return (
    <table className="c-datepicker-table" cellSpacing="0">
      <thead>{renderLabelsRow(locale)}</thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default MonthView;
