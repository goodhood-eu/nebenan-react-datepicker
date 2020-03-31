import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  getMonthLabel,
  getMonthString,
} from './utils';
import MonthView from './month_view';

const Controls = ({ label, onNext, onPrevious }) => (
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

const MonthCalendar = ({
  className: passedClassName,

  firstDay,
  weekdayShortLabels,
  monthLabels,

  selected,
  onChange,
  minDate,
  maxDate,
}) => {
  const locale = { firstDay, weekdayShortLabels, monthLabels };
  const [month, setMonth] = useState(null);

  const monthWithDefault = month || getMonthString(selected);

  const handleNextMonth = () => {
    setMonth(getMonthString(monthWithDefault, 1));
  };

  const handlePreviousMonth = () => {
    setMonth(getMonthString(monthWithDefault, -1));
  };

  const className = clsx('c-datepicker', passedClassName);
  const monthLabel = getMonthLabel(monthWithDefault, locale);

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
      <MonthView
        {...{ locale, month: monthWithDefault, minDate, maxDate, selected, onCellClick }}
      />
    </article>
  );
};

MonthCalendar.propTypes = {
  className: PropTypes.string,

  firstDay: PropTypes.number,
  weekdayShortLabels: PropTypes.arrayOf(PropTypes.string),
  monthLabels: PropTypes.arrayOf(PropTypes.string),

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
