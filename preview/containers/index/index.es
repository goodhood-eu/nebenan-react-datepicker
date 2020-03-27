import React from 'react';
import Header from '../../components/header';
import DatePicker from '../../../src';
import locale from './locale'

export default () => (
  <article>
    <Header noLink>nebenan-react-datepicker</Header>
    <div className="preview-section">
      <DatePicker {...{ locale }} />
    </div>
  </article>
);
