import React from 'react';
import clsx from 'clsx';
import { arrayOf, getMonthDetails, getToday, isAfter, isBefore, pad } from './utils';

const DAYS_COUNT = 7;

const renderLabelsRow = (locale, theme) => {
  const { firstDay, weekdayShortLabels } = locale;
  const labels = arrayOf(DAYS_COUNT).map((i) => {
    const key = i + firstDay > 6 ? 0 : i + firstDay;
    const className = clsx(theme.weekdayLabel, {
      [theme.isWeekend]: key === 6 || key === 0,
    });
    return <th key={key} className={className}>{weekdayShortLabels[key]}</th>;
  });
  return <tr>{labels}</tr>;
};

const renderMonth = ({ theme, month, minDate, maxDate, selected, onCellClick }) => {
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

      const className = clsx(theme.cell, {
        [theme.isToday]: today === key,
        [theme.isSelected]: key === selected,
        [theme.isDisabled]: isDisabled,
        [theme.isInteractive]: !isDisabled && !isStartFiller && !isEndFiller,
      });

      let label;
      if (!isStartFiller && !isEndFiller) {
        const handleClick = onCellClick && !isDisabled ? onCellClick.bind(null, key) : null;
        label = <span className={theme.date} onClick={handleClick}>{date}</span>;
      }

      return <td key={date} className={className}>{label}</td>;
    });

    return <tr key={week}>{items}</tr>;
  };

  return arrayOf(weeks).map(renderWeek);
};

const MonthView = ({ theme, locale, month, minDate, maxDate, selected, onCellClick }) => {
  const rows = renderMonth({ theme, month, minDate, maxDate, selected, onCellClick });
  return (
    <table className={theme.table} cellSpacing="0">
      <thead>{renderLabelsRow(locale, theme)}</thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default MonthView;