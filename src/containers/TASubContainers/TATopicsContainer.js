import React, { Component } from 'react';
// import StudentNewTopic from '../../components/StudentNewTopic';
import StudentTopic from '../../components/StudentTopic';
import AddTopic from '../../components/AddTopic';
import { connect } from 'react-redux'

class TATopicsContainer extends Component {
  render() {
    var proffArr = this.props.classObj.professorName.split(" ")
    var profname = proffArr[1] || proffArr[0]
    return (
      <div className="topics-container">
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
    topics: state.classReducer.classState.topics
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TATopicsContainer)