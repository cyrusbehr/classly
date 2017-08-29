import React, { Component } from 'react';
import StudentQuestion from '../../components/StudentQuestion';
import AddQuestion from '../../components/AddQuestion';
import { connect } from 'react-redux';
import _ from 'underscore';
import {addComment, deleteQuestion, upVoteQuestion, toggleStar, toggleResolve, setColor} from '../../actions/Actions';
import {sortByMagic, sortByCategory, sortByResolved} from '../../constants/algorithmicos';
import now from 'date-now';
import dateFormat from 'dateformat';

class StudentQuestionsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      accessCode: "",
    }

    this.props.socket.on('upVoteQuestion', (updatedQuestion) => {
      this.props.upVoteQuestionAction(updatedQuestion);
    });

    this.props.socket.on('deleteQuestion', (deletedQuestionId) => {
      this.props.deleteQuestionAction(deletedQuestionId);
    });
    this.props.socket.on('newComment', (newCommentObj) => {
      this.props.addCommentAction(newCommentObj);
    });
    this.props.socket.on('toggleStar', (updatedQuestion) => {
      this.props.toggleStarAction(updatedQuestion._id);
    });
    this.props.socket.on('toggleResolve', (updatedQuestion) => {
      this.props.toggleResolveAction(updatedQuestion._id);
    });
  }

  setColor() {
    for(var i = 0; i < this.props.questionsArray.length; i++){
      for(var j = 0; j < this.props.topicsArray.length; j++){
        if(this.props.questionsArray[i].tags[0] === this.props.topicsArray[j].text){
          if(this.props.topicsArray[j].color) {
            this.props.questionsArray[i].color = this.props.topicsArray[j].color;
          } else {
            this.props.questionsArray[i].color = '#00C993';
          }
        }
      }
    }
  }

  dateNow() {
    var ts = now()
    var formatedTime = dateFormat(ts, "fullDate")
    return formatedTime
  }

  render() {
    // var sortedArray = _.sortBy(this.props.questionsArray, (question) => {
    //   return -1 * question.upVotes; //negative changes to descending order
    // })
    // var sortedArray;

    // if(this.props.filter){
    //   sortedArray = sortByCategory(this.props.filter, this.props.questionsArray);
    // } else {
    //   sortedArray = sortByMagic(this.props.questionsArray);
    // }


    var sortedArray;
    if(this.props.filter === "ResolvedQuestions"){
      sortedArray = sortByResolved(this.props.questionsArray);
    } else if (this.props.filter){
      sortedArray = sortByCategory(this.props.filter, this.props.questionsArray);
    } else {
      sortedArray = sortByMagic(this.props.questionsArray);
    }
    // console.log("The new sorted array is: ", sortedArray);

    // var proffArr = this.props.professorName.split(" ");
    // var profname = proffArr[1] || proffArr[0];

    return (
      <div className="questions-container">
        <div className="questions-container-header">
          <span className="course">{this.props.className}</span>
          <span className="date">{this.dateNow()}</span>
        </div>
        <p className="questions-title">{sortedArray.length + ' Questions: ' + (this.props.filter==='' ? 'All Topics' : this.props.filter)}</p>
        {this.setColor()}
        {sortedArray.map((question, i) => {
          return(
            <StudentQuestion
              reference={question.referenceClass}
              creatorFirstname={question.firstname}
              creatorLastname={question.lastname}
              key={question._id}
              id={question._id}
              currentUpVotes={question.upVotes}
              text={question.text}
              firstname={question.firstname}
              lastname={question.lastname}
              email={question.email}
              isStarred={question.isStarred}
              isResolved={question.isResolved}
              tags={question.tags}
              questionCreator={question.username}
              comments={question.comments}
              questionCreatorType={question.userType}
              color={question.color}
              />
            )
          }
        )}
        <div className="question-container-bottom-buffer"></div>
        <span id="anchor"></span>
        <AddQuestion />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socketReducer.socket,
    questionsArray: state.classReducer.questions,
    topicsArray: state.classReducer.topics,
    professorName: state.classReducer.professorName,
    filter: state.filterReducer,
    userType: state.userReducer.userType,
    username: state.userReducer.username,
    className: state.classReducer.className,
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
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentQuestionsContainer);
