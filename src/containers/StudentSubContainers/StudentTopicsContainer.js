import React, { Component } from 'react';
// import StudentNewTopic from '../../components/StudentNewTopic';
import StudentTopic from '../../components/StudentTopic';
import AddTopic from '../../components/AddTopic';
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
        {this.props.classObj.topics.map((topic) => {
          return(
            <StudentTopic
              text={topic.text}
              votes={topic.votes}
              id={topic._id}
              key={topic._id}
            />
          )
        })}
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
