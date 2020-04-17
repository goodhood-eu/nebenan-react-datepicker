const { createElement } = require('react');
const { assert } = require('chai');
const { mount } = require('enzyme');

const locale = require('./locale');
const theme = require('./theme');
const MonthCalendar = require('../../lib/month_calendar');

describe('MonthCalendar', () => {
  it('renders MonthCalendar', () => {
    const props = {
      ...locale,
      theme,
    };

    const wrapper = mount(createElement(MonthCalendar, props));

    assert.equal(wrapper.find('.c-datepicker').length, 1, 'MonthCalendar was rendered');
  });
});
