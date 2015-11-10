
import {expect} from 'chai';

describe('immutability', () => {

  describe('is a number', () => {

    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextNumber = increment(state);

      expect(nextNumber).to.equal(43);
      expect(state).to.equal(42);
    });
  });
});
