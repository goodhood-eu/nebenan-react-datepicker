import React from 'react';
import Header from '../../components/header';
import DatePicker from '../../../src';

export default () => (
  <article>
    <Header noLink>nebenan-react-datepicker</Header>
    <div className="preview-section">
      <DatePicker />
    </div>
  </article>
);
