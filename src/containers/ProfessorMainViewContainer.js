import React, {Component} from 'react';
import { connect } from 'react-redux';

export default class ProfessorMainViewContainer extends Component {
  render() {
    return(
      <div>
        This is the ProfessorMainViewContainer container
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
)(ProfessorMainViewContainer);
