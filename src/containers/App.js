import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Routes from './Routes'
import { BrowserRouter } from 'react-router-dom';
import io from 'socket.io-client'
import { setSocket } from '../actions/Actions'

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
