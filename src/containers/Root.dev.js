import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import DevTools from './DevTools';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * Component is exported for conditional usage in Root.js
 */
module.exports = class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      /**
       * Provider is a component provided to us by the 'react-redux' bindings that
       * wraps our app - thus making the Redux store/state available to our 'connect()'
       * calls in component hierarchy below.
       */
      <Provider store={store}>
        <MuiThemeProvider>
          <div>
            <App />
            {/* Being the dev version of our Root component, we include DevTools below */}
            {/* <DevTools /> */}
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
};
