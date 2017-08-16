import React from 'react';
import ReactDOM from 'react-dom';
// import {BrowserRouter} from 'react-router-dom'

/**
* Import the stylesheet you want used! Here we just reference
* the main SCSS file we have in the styles directory.
*/
import './styles/main.scss';
import './styles/student.scss';
import './styles/dashboard.scss';

/**
* Both configureStore and Root are required conditionally.
* See configureStore.js and Root.js for more details.
*/
import { configureStore } from './store/configureStore';
import { Root } from './containers/Root';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
