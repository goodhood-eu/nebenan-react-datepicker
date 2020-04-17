const { createElement } = require('react');
const { assert, expect, spy } = require('chai');
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

  it('calls onChange after user selected a day', () => {
    const onChange = spy();
    const props = {
      ...locale,
      theme,
      selected: '2020-04-17',
      onChange,
    };

    const wrapper = mount(createElement(MonthCalendar, props));

    assert.equal(wrapper.find('.c-datepicker').length, 1, 'MonthCalendar was rendered');

    const dates = wrapper.find('.c-datepicker .c-datepicker-date');
    const day = dates.filterWhere((dateElement) => dateElement.text() === '9');

    assert.equal(day.length, 1, 'Day was rendered');

    day.last().simulate('click');

    expect(onChange).to.have.been.called(1);
    expect(onChange).to.have.been.called.with('2020-04-09');
  });
});
