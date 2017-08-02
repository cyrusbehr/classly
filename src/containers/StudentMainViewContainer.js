import React, {Component} from 'react';
import { connect } from 'react-redux';

export default class StudentMainViewContainer extends Component {
  render() {
    return(
      <div>
        This is the StudentMainViewContainer container
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  };
}

connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentMainViewContainer);
