import React, { Component } from 'react';
// import StudentNewTopic from '../../components/StudentNewTopic';
import { deleteTopic, addComment, updateFilter } from '../../actions/Actions';
import StudentTopic from '../../components/StudentTopic';
// import AddTopic from '../../components/AddTopic';
import { connect } from 'react-redux'

class StudentTopicsContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      hover: false,
      alreadyClicked: false,
      votes: this.props.votes,
      toggle: false,
    }
    this.props.socket.on('deleteTopic', (deletedTopicId) => {
      this.props.deleteTopicAction(deletedTopicId);
    });
    // this.props.socket.on('newComment', (newCommentObj) => {
    //   console.log('incoming.. 1');
    //   this.props.addCommentAction(newCommentObj);
    // })
  }

  onReturn(){
    this.props.toggleFilter('');
  }

  handleClick(id, e) {
    if(this.props.currentFilter !== "ResolvedQuestions"){
      this.props.toggleFilter("ResolvedQuestions");
    } else {
      this.props.toggleFilter('');
    }
  }

  render() {
    var numOfTopics = this.props.topics.length;
    var numOfQuestions = this.props.questions.length;
    return (
      <div className="topics-container">
        <div style={{display:'flex', 'justifyContent': 'space-between', 'alignItems':'center'}}>
          <p className='topics-title'> {numOfTopics + (numOfTopics<=1? ' Topic' : ' Topics')} , {numOfQuestions + (numOfQuestions<2 ? ' Question in Total' : ' Questions in Total')}</p>
          {this.props.currentFilter==='' ? null : <i id='return-button' className="material-icons" onClick={()=>{this.onReturn()}}>keyboard_return</i>}
          <button id='resolved-questions-button' className="resolved-questions-button" onClick={(e)=>{this.handleClick(e)}}>See Resolved Questions</button>
        </div>

        {/* <AddTopic /> */}
        {this.props.topics.map((topic, i) => {
          return(
            <StudentTopic
              text={topic.text}
              votes={topic.votes}
              id={topic._id}
              firstname={topic.firstname}
              lastname={topic.lastname}
              key={i}
              reference={topic.referenceClass}
              topicCreator={topic.username}
              hightlight={this.props.currentFilter===topic.text ? true : false}
              greyOut={this.props.currentFilter!=='' && this.props.currentFilter!==topic.text}
              isDefault={topic.isDefault}
              slideNumber={topic.slideNumber}
              color={topic.color}
            />
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("In the map state to props:", state.classReducer);
  return {
    socket: state.socketReducer.socket,
    classObj: state.classReducer,
    topics: state.classReducer.topics,
    currentFilter: state.filterReducer,
    questions: state.classReducer.questions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteTopicAction: (topicID) => {
      dispatch(deleteTopic(topicID));
    },
    addCommentAction: (newQuestionObject) => {
      dispatch(addComment(newQuestionObject))
    },
    toggleFilter: (newFilter) => {
      dispatch(updateFilter(newFilter))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentTopicsContainer)
