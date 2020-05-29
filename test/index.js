const { createElement } = require('react');
const { assert } = require('chai');
const { mount } = require('enzyme');
const { spy } = require('sinon');

const { findDate, findDatepicker, navigateToNextMonth, navigateToPreviousMonth } = require('./helpers');
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

    assert.isOk(findDatepicker(wrapper), 'MonthCalendar was rendered');
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

    assert.isOk(findDatepicker(wrapper), 'MonthCalendar was rendered');

    const day = findDate(wrapper, '9');
    assert.isOk(day, 'Day was rendered');

    day.simulate('click');

    assert.isTrue(onChange.calledOnce, 'onChange callback was called');
    assert.deepEqual(onChange.getCall(0).args[0], new Date(2020, 3, 9), 'correct day was provided by onChange');
  });

  it('cannot select dates before minDate', () => {
    const onChange = spy();
    const props = {
      ...locale,
      theme,
      selected: new Date(2020, 3, 17),
      minDate: new Date(2020, 2, 20, 12, 1, 10),
      onChange,
    };

    const wrapper = mount(createElement(MonthCalendar, props));
    assert.isOk(findDatepicker(wrapper), 'MonthCalendar was rendered');

    navigateToPreviousMonth(wrapper);
    findDate(wrapper, 20).simulate('click');
    findDate(wrapper, 19).simulate('click');
    findDate(wrapper, 21).simulate('click');

    assert.isTrue(onChange.calledTwice, 'onChange was called twice');
    assert.deepEqual(onChange.getCall(0).args[0], new Date(2020, 2, 20), 'First date was selected');
    assert.deepEqual(onChange.getCall(1).args[0], new Date(2020, 2, 21), 'Third date was selected');
  });

  it('cannot select dates after maxDate', () => {
    const onChange = spy();
    const props = {
      ...locale,
      theme,
      selected: new Date(2020, 3, 17),
      maxDate: new Date(2020, 4, 20),
      onChange,
    };

    const wrapper = mount(createElement(MonthCalendar, props));
    assert.equal(findDatepicker(wrapper).length, 1, 'MonthCalendar was rendered');

    navigateToNextMonth(wrapper);
    findDate(wrapper, 20).simulate('click');
    findDate(wrapper, 23).simulate('click');
    findDate(wrapper, 19).simulate('click');

    assert.isTrue(onChange.calledTwice, 'onChange was called twice');
    assert.deepEqual(onChange.getCall(0).args[0], new Date(2020, 4, 20), 'First date was selected');
    assert.deepEqual(onChange.getCall(1).args[0], new Date(2020, 4, 19), 'Third date was selected');
  });
});
