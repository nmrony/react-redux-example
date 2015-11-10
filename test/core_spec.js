
import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next} from '../src/core';

describe('Application logic', ()=> {
  //test setEntries Immutibility
  describe('setEntries', () => {
   it('is immutable', () => {
     let state = Map();
     let entries = List.of('Transporting', '28 Days Later');
     let nextState = setEntries(state, entries);

     expect(nextState).to.equal(Map({
       entries: List.of(
         'Transporting',
         '28 Days Later'
       )
     }));
   });
  });

  //test next function
  describe('next', () => {

  });
});
