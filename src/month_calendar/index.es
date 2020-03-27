import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { formatNumber as pad } from 'nebenan-helpers/lib/formatters';
import { arrayOf } from 'nebenan-helpers/lib/data';
import { getMonthDetails, getToday } from './utils';

const Controls = () => (
  <div>
    <button>back</button>
    <button>forward</button>
  </div>
);

const DAYS_COUNT = 7;

const renderLabelsRow = (locale) => {
  const { firstDay, modules: { calendar: { weekdaysShort } } } = locale;
  const labels = arrayOf(DAYS_COUNT).map((i) => {
    const key = i + firstDay > 6 ? 0 : i + firstDay;
    const className = clsx('c-month_calendar-label', {
      'is-weekend': key === 6 || key === 0,
    });
    return <th key={key} className={className}>{weekdaysShort[key]}</th>;
  });
  return <tr>{labels}</tr>;
};

const renderMonth = ({ month, onCellClick }) => {
  const { days, offset } = getMonthDetails(month);

  const weeks = Math.ceil((days + offset) / DAYS_COUNT);
  const today = getToday();

  const renderWeek = (week) => {
    const shift = week * DAYS_COUNT;
    const isFirstWeek = week === 0;

    const items = arrayOf(DAYS_COUNT).map((day) => {
      const date = shift + day + 1 - offset;

      const key = `${month}-${pad(date)}`;

      const className = clsx('c-month_calendar-cell', {
        'is-today': today === key,
      });

      const isStartFiller = isFirstWeek && day < offset;
      const isEndFiller = date > days;

      let label;
      if (!isStartFiller && !isEndFiller) {
        const handleClick = onCellClick ? onCellClick.bind(null, key) : null;
        const labelClassName = clsx('c-month_calendar-date', {
          'is-interactive': false,
        });
        label = <span className={labelClassName} onClick={handleClick}>{date}</span>;
      }

      return <td key={date} className={className}>{label}</td>;
    });

    return <tr key={week}>{items}</tr>;
  };

  return arrayOf(weeks).map(renderWeek);
};

const Calendar = ({ locale }) => {
  const onCellClick = () => {
    console.log('cell click');
  };

  const month = '2020-05';

  const rows = renderMonth({ month, onCellClick });
  return (
    <table className="c-month_calendar-table" cellSpacing="0">
      <thead>{renderLabelsRow(locale)}</thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const MonthCalendar = ({ className: passedClassName, locale }) => {
  const className = passedClassName;
  const monthLabel = 'January';

  return (
    <article className={className}>
      <header className="c-month_calendar-header ui-card-section">
        <h2>{monthLabel}</h2>
        <Controls />
      </header>
      <Calendar {...{ locale }} />
    </article>
  );
};

MonthCalendar.propTypes = {
  className: PropTypes.string,
  locale: PropTypes.object,
};

export default MonthCalendar;
