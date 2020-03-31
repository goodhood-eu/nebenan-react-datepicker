import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { formatNumber as pad } from 'nebenan-helpers/lib/formatters';
import { arrayOf } from 'nebenan-helpers/lib/data';
import {
  getMonthDetails,
  getMonthLabel,
  getMonthString,
  getToday,
  isAfter,
  isBefore,
} from './utils';


const Controls = ({ label, onNext, onPrevious }) => {
  return (
    <div className="c-datepicker-controls">
      <i onClick={onPrevious} className='c-datepicker-controls-previous'>
        ←
      </i>
      <span className="c-datepicker-controls-label">{label}</span>
      <i onClick={onNext} className="c-datepicker-controls-next">
        →
      </i>
    </div>
  );
};

const DAYS_COUNT = 7;

const renderLabelsRow = (locale) => {
  const { firstDay, modules: { calendar: { weekdaysShort } } } = locale;
  const labels = arrayOf(DAYS_COUNT).map((i) => {
    const key = i + firstDay > 6 ? 0 : i + firstDay;
    const className = clsx('c-datepicker-label', {
      'is-weekend': key === 6 || key === 0,
    });
    return <th key={key} className={className}>{weekdaysShort[key]}</th>;
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

const Calendar = ({ locale, month, minDate, maxDate, selected, onCellClick }) => {
  const rows = renderMonth({ month, minDate, maxDate, selected, onCellClick });
  return (
    <table className="c-datepicker-table" cellSpacing="0">
      <thead>{renderLabelsRow(locale)}</thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const MonthCalendar = ({
  className: passedClassName,
  locale,
  selected,
  onChange,
  minDate,
  maxDate,
}) => {
  const [month, setMonth] = useState(null);

  const monthWithDefault = month || getMonthString(selected);

  const handleNextMonth = () => {
    setMonth(getMonthString(monthWithDefault, 1));
  };

  const handlePreviousMonth = () => {
    setMonth(getMonthString(monthWithDefault, -1));
  };

  const className = clsx('c-datepicker', passedClassName);
  const monthLabel = getMonthLabel(monthWithDefault , locale);

  const onCellClick = onChange;

  return (
    <article className={className}>
      <header className="ui-card-section">
        <Controls
          label={monthLabel}
          onNext={handleNextMonth}
          onPrevious={handlePreviousMonth}
        />
      </header>
      <Calendar {...{ locale, month: monthWithDefault, minDate, maxDate, selected, onCellClick }} />
    </article>
  );
};

MonthCalendar.propTypes = {
  className: PropTypes.string,
  locale: PropTypes.object,

  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  minDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
};

export default MonthCalendar;
