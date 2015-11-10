
import {expect} from 'chai';
import {List} from 'immutable'

describe('immutability', () => {
  //learning test
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

  //List test
  describe('A List', () => {
    function AddMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      let state = List.of('Transporting', '28 Days Later');
      let nextState = AddMovie(state, 'Sunshine');

      expect(nextState).to.equal(List.of(
        'Transporting',
        '28 Days Later',
        'Sunshine'
      ));

      expect(state).to.equal(List.of('Transporting', '28 Days Later'));
    });
  });

  //Map test

});
