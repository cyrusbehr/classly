import React, {Component} from 'react';
import { connect } from 'react-redux';
import StudentTopicsContainer from './StudentTopicsContainer'
import StudentQuestionsContainer from './StudentQuestionsContainer'

 class StudentMainViewContainer extends Component {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentMainViewContainer);
