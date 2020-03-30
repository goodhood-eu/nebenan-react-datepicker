import React, { useState } from 'react';
import Header from '../../components/header';
import DatePicker from '../../../src';
import locale from './locale';

export default () => {
  const [selectedDate, setSelectedDate] = useState(null);

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
          locale={locale}
          selected={selectedDate}
          defaultMonth="2020-04"
          minDate={minDate}
          maxDate={maxDate}
          onChange={handleDateSelect}
        />
      </div>
    </article>
  );
};
