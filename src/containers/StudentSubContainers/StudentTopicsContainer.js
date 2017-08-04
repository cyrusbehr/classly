import React, { Component } from 'react';
// import StudentNewTopic from '../../components/StudentNewTopic';
import AddTopic from '../../components/StudentTopic';
import StudentTopic from '../../components/AddTopic';
import {connect} from 'react-redux'

class StudentTopicsContainer extends Component {
  render() {
    var proffArr = this.props.classObj.professorName.split(" ")
    var profname = proffArr[1] || proffArr[0]
    return (
      <div className="topics-container">
        <div className="topics-container-header">
          <span className="course">MECH 101</span>
          <span className="lecturer">Prof {profname}</span>
        </div>
        <AddTopic />
        <StudentTopic />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    classObj: state.classReducer.classState
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentTopicsContainer)
