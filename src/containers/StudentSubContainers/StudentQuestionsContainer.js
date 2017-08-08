import React, { Component } from 'react';
import StudentQuestion from '../../components/StudentQuestion';
import AddQuestion from '../../components/AddQuestion';
import { connect } from 'react-redux';
import _ from 'underscore';
import {addComment, deleteQuestion, upVoteQuestion, toggleStar, toggleResolve} from '../../actions/Actions';
import {sortByMagic, sortByCategory} from '../../constants/algorithmicos';

class StudentQuestionsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      accessCode: "",
    }
    //listener that calls deleteQuestionAction
    this.props.socket.on('deleteQuestion', (deletedQuestionId) => {
      this.props.deleteQuestionAction(deletedQuestionId);
    });
    this.props.socket.on('newComment', (newCommentObj) => {
      console.log("This ones for your corey! : ", newCommentObj);
      this.props.addCommentAction(newCommentObj);
    });
    this.props.socket.on('toggleStar', (updatedQuestion) => {
      console.log("this is toggleState listener updatedQuestion:", updatedQuestion);
      this.props.toggleStarAction(updatedQuestion._id);
    });
    this.props.socket.on('toggleResolve', (updatedQuestion) => {
      this.props.toggleResolveAction(updatedQuestion._id);
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

    console.log("The new sorted array is: ", sortedArray);

    var proffArr = this.props.professorName.split(" ");
    var profname = proffArr[1] || proffArr[0];

    return (
      <div className="questions-container">
        <div className="questions-container-header">
          <span>This is {this.props.userType} view</span>
          <span className="course">{this.props.className}</span>
          <span className="lecturer">Prof {profname}</span>
          <span className="date">1st Aug 2017</span>
        </div>
        <AddQuestion />
        {sortedArray.map((question, i) => {
          return(
            <StudentQuestion
              reference={question.referenceClass}
              key={question._id}
              id={question._id}
              studentName={question.username}
              currentUpVotes={question.upVotes}
              text={question.text}
              isStarred={question.isStarred}
              isResolved={question.isResolved}
              tags={question.tags}
              questionCreator={question.username}
              comments={question.comments}
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
    userType: state.userReducer.userType,
    username: state.userReducer.username,
    className: state.classReducer.classState.className,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteQuestionAction: (ID) => {
      dispatch(deleteQuestion(ID));
    },
    addCommentAction: (newQuestionObject) => {
      dispatch(addComment(newQuestionObject))
    },
    upVoteQuestionAction: (updatedQuestion) => {
      dispatch(upVoteQuestion(updatedQuestion));
    },
    toggleStarAction: (ID) => {
      dispatch(toggleStar(ID))
    },
    toggleResolveAction: (ID) => {
      dispatch(toggleResolve(ID))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentQuestionsContainer);
