import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  getMonthLabel,
  getMonthString,
} from './utils';
import MonthView from './month_view';

const Controls = ({ theme, label, onNext, onPrevious }) => (
  <div className={theme.controls}>
    <i onClick={onPrevious} className={theme.controlsPrevious} />
    <span className={theme.controlsLabel}>{label}</span>
    <i onClick={onNext} className={theme.controlsNext} />
  </div>
);

const MonthCalendar = ({
  className: passedClassName,
  theme,

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

  const className = clsx(theme.root, passedClassName);
  const monthLabel = getMonthLabel(monthWithDefault, locale);

  const onCellClick = onChange;

  return (
    <article className={className}>
      <header>
        <Controls
          theme={theme}
          label={monthLabel}
          onNext={handleNextMonth}
          onPrevious={handlePreviousMonth}
        />
      </header>
      <MonthView
        {...{ locale, theme, month: monthWithDefault, minDate, maxDate, selected, onCellClick }}
      />
    </article>
  );
};

MonthCalendar.propTypes = {
  className: PropTypes.string,

  theme: PropTypes.object.isRequired,

  firstDay: PropTypes.number.isRequired,
  weekdayShortLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  monthLabels: PropTypes.arrayOf(PropTypes.string).isRequired,

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
