import moment from 'moment';
import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
} from 'react-dom/test-utils';

import chai from 'chai';

const expect = chai.expect;

export default jsx => {
  const calendar = renderIntoDocument(jsx);

  return {
    assertYear(expectedYear) {
      const year = findRenderedDOMComponentWithClass(calendar, 'year');
      expect(findDOMNode(year).textContent).to.equal(expectedYear);
      return this;
    },

    assertMonth(expectedMonth) {
      const month = findRenderedDOMComponentWithClass(calendar, 'month');
      expect(findDOMNode(month).textContent).to.equal(expectedMonth);
      return this;
    },

    previousMonth() {
      const previous = findRenderedDOMComponentWithClass(calendar, 'previous');
      Simulate.click(previous.firstChild);
      return this;
    },

    nextMonth() {
      const next = findRenderedDOMComponentWithClass(calendar, 'next');
      Simulate.click(next.firstChild);
      return this;
    },

    assertSelectedDay(expectedDay) {
      const selected = findRenderedDOMComponentWithClass(calendar, 'selected');
      const value = findDOMNode(selected).textContent;
      expect(+value).to.equal(expectedDay);
      return this;
    },

    assertToday() {
      const today = findRenderedDOMComponentWithClass(calendar, 'today');
      const value = findDOMNode(today).textContent;
      expect(value).to.equal(moment().format('D'));
      return this;
    },

    clickDay(date) {
      const days = scryRenderedDOMComponentsWithClass(calendar, 'Day');
      const found = days.filter(day => {
        const value = findDOMNode(day).dataset.day;
        return +value === date;
      });
      Simulate.click(found[0].firstChild);
      return this;
    },
  };
};
