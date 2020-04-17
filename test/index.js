const { createElement } = require('react');
const { assert } = require('chai');
const { mount } = require('enzyme');
const { spy } = require('sinon');

const locale = require('./locale');
const theme = require('./theme');
const MonthCalendar = require('../lib');

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
      selected: new Date(2020, 3, 17),
      onChange,
    };

    const wrapper = mount(createElement(MonthCalendar, props));

    assert.equal(wrapper.find('.c-datepicker').length, 1, 'MonthCalendar was rendered');

    const dates = wrapper.find('.c-datepicker .c-datepicker-date');
    const day = dates.filterWhere((dateElement) => dateElement.text() === '9');

    assert.equal(day.length, 1, 'Day was rendered');

    day.last().simulate('click');

    assert.isTrue(onChange.calledOnce, 'onChange callback was called');
    assert.deepEqual(onChange.getCall(0).args[0], new Date(2020, 3, 9), 'correct day was provided by onChange');
  });
});
