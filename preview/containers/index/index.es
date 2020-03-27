import React, { useState } from 'react';
import Header from '../../components/header';
import DatePicker from '../../../src';
import locale from './locale'

export default () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };


  return (
    <article>
      <Header noLink>nebenan-react-datepicker</Header>
      <div className="preview-section">
        <DatePicker
          locale={locale}
          selected={selectedDate}
          defaultMonth="2020-04"
          onChange={handleDateSelect}
        />
      </div>
    </article>
  );
};
