import React, { useState } from 'react';
import Header from '../../components/header';
import DatePicker from '../../../src';
import locale from './locale';

export default () => {
  const [selectedDate, setSelectedDate] = useState('2020-04-05');

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const minDate = new Date(2020, 2, 1);
  const maxDate = new Date(2020, 4, 1);

  return (
    <article>
      <Header noLink>nebenan-react-datepicker</Header>
      <div className="preview-section">
        <DatePicker
          selected={selectedDate}
          minDate={minDate}
          maxDate={maxDate}
          onChange={handleDateSelect}
          firstDay={locale.firstDay}
          weekdayShortLabels={locale.weekdayShortLabels}
          monthLabels={locale.monthLabels}
        />
      </div>
    </article>
  );
};
