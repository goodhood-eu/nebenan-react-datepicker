const { assert } = require('chai');

const utils = require('../lib/utils');

describe('utils', () => {
  it('dateToArray', () => {
    const dateArrays = [
      [1988, 4, 27],
      [1234, 7, 12],
      [1628, 0, 31],
      [2020, 1, 29],
    ];

    dateArrays.forEach((array) => {
      assert.deepEqual(utils.dateToArray(new Date(...array)), array, 'converts date to array correctly');
    });
  });

  it('getDateArrayDiff', () => {
    const date1 = [1988, 4, 27];
    const date2 = [1988, 4, 27];

    const date3 = [1234, 7, 12];
    const date4 = [2020, 1, 29];

    const date3sm = [1988, 4, 26];
    const date4sm = [1988, 4, 28];

    assert.equal(utils.getDateArrayDiff(date1, date2), 0, 'same date 0 diff');

    assert.isBelow(utils.getDateArrayDiff(date1, date3), 0, 'past date negative diff');
    assert.isAbove(utils.getDateArrayDiff(date1, date4), 0, 'future date positive diff');

    assert.isBelow(utils.getDateArrayDiff(date1, date3sm), 0, 'past date negative diff');
    assert.isAbove(utils.getDateArrayDiff(date1, date4sm), 0, 'future date positive diff');
  });
});
