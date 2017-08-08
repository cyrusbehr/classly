import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Routes from './Routes'
import { BrowserRouter } from 'react-router-dom';
import io from 'socket.io-client'
import { setSocket } from '../actions/Actions'


/**
 * It is common practice to have a 'Root' container/component require our main App (this one).
 * Again, this is because it serves to wrap the rest of our application with the Provider
 * component to make the Redux store available to the rest of the app.
 */
class App extends Component {
  constructor(props) {
    super(props)

    this.socket = io();
    this.props.setSocketAction(this.socket)

  }
  render() {
    console.log('render App component');
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}
//
// App.propTypes = {
//   counter: PropTypes.number.isRequired,
//   actions: PropTypes.object.isRequired
// };
//
function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSocketAction: (socket) => {
      dispatch(setSocket(socket))
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
