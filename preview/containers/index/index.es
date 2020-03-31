import React, { useState } from 'react';
import Header from '../../components/header';
import DatePicker from '../../../src';
import locale from './locale';

export default () => {
  const [preselectedDate, setPreselectedDate] = useState('1994-05-16');
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <article>
      <Header noLink>nebenan-react-datepicker</Header>
      <div className="preview-section">
        <ul>
          <li>

            <h3>Simple</h3>
            <DatePicker
              selected={selectedDate}
              onChange={setSelectedDate}

              {...locale}
            />
          </li>
          <li>

            <h3>Preselected Date</h3>
            <DatePicker
              selected={preselectedDate}
              onChange={setPreselectedDate}

              {...locale}
            />
          </li>
          <li>

            <h3>Min-Date</h3>
            <DatePicker
              selected={selectedDate}
              onChange={setSelectedDate}
              minDate={new Date(2020, 2, 1)}
              maxDate={new Date(2020, 4, 1)}

              {...locale}
            />
          </li>
          <li>

            <h3>Max-Date</h3>
            <DatePicker
              selected={selectedDate}
              onChange={setSelectedDate}
              maxDate={new Date(2020, 4, 1)}

              {...locale}
            />

          </li>
          <li>
            <h3>Min-Date & Max-Date</h3>
            <DatePicker
              selected={selectedDate}
              onChange={setSelectedDate}
              maxDate={new Date(2020, 4, 1)}
              minDate={new Date(2020, 2, 1)}

              {...locale}
            />
          </li>
        </ul>
      </div>
    </article>
  );
};
