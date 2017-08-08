import React, { Component } from 'react';
// import StudentNewTopic from '../../components/StudentNewTopic';
import StudentTopic from '../../components/StudentTopic';
import AddTopic from '../../components/AddTopic';
import { connect } from 'react-redux'

class ProfessorTopicsContainer extends Component {
  render() {
    var proffArr = this.props.classObj.professorName.split(" ")
    var profname = proffArr[1] || proffArr[0]
    return (
      <div className="topics-container">
        {/* <div className="topics-container-header">
          <span className="course">MECH 101</span>

        <div className="topics-container-header">
          <span className="course">{this.props.classObj.className}</span>

          <span className="lecturer">Prof {profname}</span>
        </div> */}
        <AddTopic />
        {this.props.topics.map((topic, i) => {

          return(
            <StudentTopic
              text={topic.text}
              votes={topic.votes}
              id={topic._id}
              key={i}
              reference={topic.referenceClass}
              topicCreator={topic.username}
              hightlight={this.props.currentFilter===topic.text ? true : false}
            />
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("In the map state to props:", state.classReducer.classState);
  return {
    classObj: state.classReducer.classState,
    topics: state.classReducer.classState.topics,
    currentFilter: state.filterReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteTopicAction: (topicID) => {
      dispatch(deleteTopic(topicID));
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessorTopicsContainer)