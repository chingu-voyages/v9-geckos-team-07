import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { App } from './components/App';
import { reducers } from './reducers';

import './index.css';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App fetchUser={() => console.log('hi')} />
  </Provider>,
  document.getElementById('root')
);