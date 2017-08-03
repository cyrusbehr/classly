import React, { Component } from 'react';
import StudentQuestion from '../../components/StudentQuestion';
import AddQuestion from '../../components/AddQuestion';
import { connect } from 'react-redux';

class StudentQuestionsContainer extends Component {

  render() {
    return (
      <div className="questions-container">

        <div className="questions-container-header">
          <span className="date">1st Aug 2017</span>
        </div>

        <AddQuestion />
        <StudentQuestion />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentQuestionsContainer);
