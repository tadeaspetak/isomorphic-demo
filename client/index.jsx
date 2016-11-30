import transit from 'transit-immutable-js';

import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import routes from 'routes';
import reducer from 'reducers';
import {promiseMiddleware} from '../shared/utils';

// styles
require('font-awesome/css/font-awesome.css');
require('nprogress/nprogress.css');
require('../shared/styles/screen.scss');

// media
require.context('../shared/assets/media', true, /^\.\//);

const state = transit.fromJSON(JSON.stringify(window.state));
let store = applyMiddleware(promiseMiddleware)(createStore)(reducer, state);
let onUpdate = function onUpdate(){
  //console.log('updating route');
};
render(<Provider store={store}>
  <Router children={routes} history={browserHistory} onUpdate={onUpdate}/>
  </Provider>, document.getElementById('app'));
