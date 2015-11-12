import React from 'react';
import ReactDOM from 'react-dom';
import {List, fromJS} from 'immutable';
import ReactTestUtils from 'react-addons-test-utils';
//import Voting from '../../src/components/Voting';
import {Voting} from '../../src/components/Voting';
import reducer from '../../src/reducer';
import {expect} from 'chai';


describe('Voting', () => {
  it('renders a pair of buttons', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Voting pair={['Trainspotting', '28 Days Later']}/>
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Trainspotting');
    expect(buttons[1].textContent).to.equal('28 Days Later');
  });

  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = ReactTestUtils.renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              vote={vote}/>
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
    ReactTestUtils.Simulate.click(buttons[0]);
    expect(votedWith).to.equal('Trainspotting');
  });

  it('disables buttons when user has voted', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              hasVoted="Trainspotting" />
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds label to the voted entry', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              hasVoted="Trainspotting" />
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).to.contain('Voted');
  });

  it('renders just the winner when there is one', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Voting winner="Trainspotting" />
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  });

  /////////////////////////////////

  it('does update DOM when prop changes', () => {
    const pair = List.of('Trainspotting', '28 Days Later');
    const component = ReactTestUtils.renderIntoDocument(
      <Voting pair={pair} />
    );

    let firstButton = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');

    const newPair = pair.set(0, 'Sunshine');
    component.setProps({pair: newPair});
    firstButton = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Sunshine');
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      },
      hasVoted: 'Trainspotting'
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Sunshine', 'Slumdog Millionaire']
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Sunshine', 'Slumdog Millionaire']
      }
    }));
  });
});
