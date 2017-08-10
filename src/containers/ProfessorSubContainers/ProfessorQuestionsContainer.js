import React, { Component } from 'react';
import ProfessorQuestion from '../../components/ProfessorQuestion';
import AddQuestion from '../../components/AddQuestion';
import { connect } from 'react-redux';
import _ from 'underscore';
import {addComment, deleteTopic, deleteQuestion, upVoteQuestion, toggleStar, toggleResolve} from '../../actions/Actions';
import {sortByMagic, sortByCategory} from '../../constants/algorithmicos';

class ProfessorQuestionsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.props.socket.on('newComment', (newCommentObj) => {
      this.props.addCommentAction(newCommentObj);
    });
    this.props.socket.on('deleteQuestion', (deletedQuestionId) => {
      this.props.deleteQuestionAction(deletedQuestionId);
    });
    this.props.socket.on('toggleStar', (updatedQuestion) => {
      console.log("this is toggleStar updatedQ", updatedQuestion);
      this.props.toggleStarAction(updatedQuestion._id);
    });
    this.props.socket.on('toggleResolve', (updatedQuestion) => {
      this.props.toggleResolveAction(updatedQuestion._id);
    });
    this.props.socket.on('deleteTopic', (deletedTopicId) => {
      this.props.deleteTopicAction(deletedTopicId);
    });
  }

  render() {

    // var sortedArray = _.sortBy(this.props.questionsArray, (question) => {
    //   return -1 * question.upVotes; //negative changes to descending order
    // })

    var sortedArray;

    if(this.props.filter){
      sortedArray = sortByCategory(this.props.filter, this.props.questionsArray);
    } else {
      sortedArray = sortByMagic(this.props.questionsArray);
    }

      var proffArr = this.props.professorName.split(" ")
      var profname = proffArr[1] || proffArr[0]

    return (
      <div className="questions-container">
        <div className="questions-container-header">
          <span className="course">{this.props.className}</span>
          {/* <span>This is {this.props.userType} view</span> */}
          <span>Course Access Code: {this.props.code} </span>
          {/* <span># Students: XX</span> */}
          {/* <span>#Q's: {this.props.questionsArray.length}</span> */}
          <span className="lecturer">Prof {profname}</span>
          <span className="date">1st Aug 2017</span>
        </div>
        <AddQuestion />
        <p className="question-title">{sortedArray.length + ' Questions: ' + (this.props.filter==='' ? 'All Topics' : this.props.filter)}</p>
        {sortedArray.map((question, i) => {
          return(
            <ProfessorQuestion
              reference={question.referenceClass}
              key={question._id}
              id={question._id}
              currentUpVotes={question.upVotes}
              text={question.text}
              isResolved={question.isResolved}
              isStarred={question.isStarred}
              tags={question.tags}
              questionCreator={question.username}
              comments={question.comments}
              userType={question.userType}
              />
            )
          }
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socketReducer.socket,
    questionsArray: state.classReducer.classState.questions,
    professorName: state.classReducer.classState.professorName,
    filter: state.filterReducer,
    code: state.classReducer.classState.accessCode,
    userType: state.userReducer.userType,
    className: state.classReducer.classState.className
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCommentAction: (newQuestionObject) => {
      dispatch(addComment(newQuestionObject))
    },
    deleteQuestionAction: (ID) => {
      dispatch(deleteQuestion(ID));
    },
    toggleStarAction: (ID) => {
      dispatch(toggleStar(ID))
    },
    upVoteQuestionAction: (updatedQuestion) => {
      dispatch(upVoteQuestion(updatedQuestion));
    },
    toggleResolveAction: (ID) => {
      dispatch(toggleResolve(ID))
    },
    deleteTopicAction: (topicID) => {
      dispatch(deleteTopic(topicID));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessorQuestionsContainer);
