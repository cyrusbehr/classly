import React, { Component } from 'react';
// import StudentNewTopic from '../../components/StudentNewTopic';
import StudentTopic from '../../components/StudentTopic';
import { deleteTopic } from '../../actions/Actions';
import AddTopic from '../../components/AddTopic';
import { connect } from 'react-redux'

class TATopicsContainer extends Component {
  constructor(props){
    super(props)
    this.state={}
    this.props.socket.on('deleteTopic', (deletedTopicId) => {
      this.props.deleteTopicAction(deletedTopicId);
    });
  }


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
              hightlight={this.props.currentFilter===topic.text ? true : false}
              slideNumber={topic.slideNumber}
            />
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    classObj: state.classReducer.classState,
    topics: state.classReducer.classState.topics,
    currentFilter: state.filterReducer,
    socket: state.socketReducer.socket,
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
)(TATopicsContainer)
