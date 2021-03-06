import React, { Component } from 'react';
import ProfessorQuestion from '../../components/ProfessorQuestion';
import AddQuestion from '../../components/AddQuestion';
import { connect } from 'react-redux';
import _ from 'underscore';
import {addComment, deleteTopic, deleteQuestion, upVoteQuestion, toggleStar, toggleResolve} from '../../actions/Actions';
import {sortByMagic, sortByCategory, sortByResolved} from '../../constants/algorithmicos';
import now from 'date-now';
import dateFormat from 'dateformat';

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
    this.props.socket.on('upVoteQuestion', (updatedQuestion) => {
      this.props.upVoteQuestionAction(updatedQuestion);
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

    var sortedArray;
    if(this.props.filter === "ResolvedQuestions"){
      sortedArray = sortByResolved(this.props.questionsArray);
      console.log(this.props.questionsArray);
      console.log("this is sortByResolved: ", sortedArray);
    } else if (this.props.filter){
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
          <span className="lecturer">Prof {profname}</span>
          <span className="date">{this.dateNow()}</span>
        </div>
        <p className="questions-title">{sortedArray.length + ' Questions: ' + (this.props.filter==='' ? 'All Topics' : this.props.filter)}</p>
        {this.setColor()}
        {sortedArray.map((question, i) => {
          return(
            <ProfessorQuestion
              reference={question.referenceClass}
              email={question.email}
              creatorFirstname={question.firstname}
              creatorLastName={question.lastname}
              key={question._id}
              id={question._id}
              currentUpVotes={question.upVotes}
              text={question.text}
              isResolved={question.isResolved}
              isStarred={question.isStarred}
              tags={question.tags}
              comments={question.comments}
              userType={question.userType}
              color={question.color}
              />
            )
          }
        )}
        <div className="question-container-bottom-buffer"></div>
        <span id="anchor"></span>
        <AddQuestion />
        {/* <div div="question-container-bottom-buffer"></div> */}
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
    code: state.classReducer.accessCode,
    userType: state.userReducer.userType,
    className: state.classReducer.className
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
