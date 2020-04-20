const tryGetLast = (elements) => {
  if (elements.length <= 0) return null;
  return elements.last();
};

const navigateToNextMonth = (wrapper) => {
  wrapper.find('.c-datepicker .c-datepicker-controls-next').last().simulate('click');
};

const navigateToPreviousMonth = (wrapper) => {
  wrapper.find('.c-datepicker .c-datepicker-controls-previous').last().simulate('click');
};

const findDatepicker = (wrapper) => tryGetLast(wrapper.find('.c-datepicker'));

const findDate = (wrapper, dateText) => {
  const dates = wrapper.find('.c-datepicker .c-datepicker-date');
  const date = dates.filterWhere((dateElement) => dateElement.text() === String(dateText));
  return tryGetLast(date);
};

module.exports = { findDate, findDatepicker, navigateToNextMonth, navigateToPreviousMonth };
