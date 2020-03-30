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
  isMonthInYearRange,
} from './utils';


const Controls = ({ label, onNext, onPrevious }) => {
  const handlePrevious = () => {
    if (onPrevious) return onPrevious();
  };
  const handleNext = () => {
    if (onNext) return onNext();
  };

  const previousClasses = clsx('c-datepicker-controls-previous', {
    'is-disabled': !onPrevious,
  });

  const nextClasses = clsx('c-datepicker-controls-next', {
    'is-disabled': !onNext,
  });

  return (
    <div className="c-datepicker-controls">
      <i onClick={handlePrevious} className={previousClasses}>
        ←
      </i>
      <span className="c-datepicker-controls-label">{label}</span>
      <i onClick={handleNext} className={nextClasses}>
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
        'is-interactive': !isDisabled && !isStartFiller && !isEndFiller
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
  defaultMonth,
  selected,
  onChange,
  minDate,
  maxDate,
  yearRange,
}) => {
  const [month, setMonth] = useState(defaultMonth);

  useEffect(() => {
    setMonth(defaultMonth);
  }, [defaultMonth]);

  const handleNextMonth = () => {
    setMonth(getMonthString(month, 1));
  };

  const handlePreviousMonth = () => {
    setMonth(getMonthString(month, -1));
  };

  const canNavigateNextMonth = yearRange
    && isMonthInYearRange(getMonthString(month, 1), yearRange);
  const canNavigatePreviousMonth = yearRange
    && isMonthInYearRange(getMonthString(month, -1), yearRange);


  const className = clsx('c-datepicker', passedClassName);
  const monthLabel = getMonthLabel(month, locale);

  const onCellClick = onChange;

  return (
    <article className={className}>
      <header className="ui-card-section">
        <Controls
          label={monthLabel}
          onNext={canNavigateNextMonth && handleNextMonth}
          onPrevious={canNavigatePreviousMonth && handlePreviousMonth}
        />
      </header>
      <Calendar {...{ locale, month, minDate, maxDate, selected, onCellClick }} />
    </article>
  );
};

MonthCalendar.propTypes = {
  className: PropTypes.string,
  defaultMonth: PropTypes.string.isRequired,
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
  yearRange: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
  ]),
};

export default MonthCalendar;
