import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from './reducer';
import App from './components/App';
//import Voting from './components/Voting';
import {VotingContainer} from './components/Voting';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Result';

const store = createStore(reducer);

const socket = io(`${location.protocol}//${location.hostname}:8090`);

socket.on('state', state =>
    store.dispatch({type: 'SET_STATE', state})
);

const routes = <Route component={App}>
  <Route path="/" component={VotingContainer} />
  <Route path="/results" component={ResultsContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
