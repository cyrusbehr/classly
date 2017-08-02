import React, {Component} from 'react';
import { connect } from 'react-redux';
import StudentTopicsContainer from './StudentTopicsContainer'
import StudentQuestionsContainer from './StudentQuestionsContainer'

export default class StudentMainViewContainer extends Component {
  render() {
    return(
      <div>
        <StudentTopicsContainer />
        <StudentQuestionsContainer />
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
