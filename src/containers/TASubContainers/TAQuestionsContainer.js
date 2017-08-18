import React, { Component } from 'react';
import TAQuestion from '../../components/TAQuestion';
import AddQuestion from '../../components/AddQuestion';
import { connect } from 'react-redux';
import _ from 'underscore';
import {addComment, deleteQuestion, upVoteQuestion, toggleStar, toggleResolve} from '../../actions/Actions';
import {sortByMagic, sortByCategory, sortByResolved} from '../../constants/algorithmicos';
import now from 'date-now';
import dateFormat from 'dateformat';


class TAQuestionsContainer extends Component {
  constructor(props) {
    super(props)
    this.props.socket.on('newComment', (newCommentObj) => {
      this.props.addCommentAction(newCommentObj);
    });
    this.props.socket.on('deleteQuestion', (deletedQuestionId) => {
      this.props.deleteQuestionAction(deletedQuestionId);
    });
    this.props.socket.on('toggleStar', (updatedQuestion) => {
      console.log("TA toggleState updatedQuestion: ", updatedQuestion);
      this.props.toggleStarAction(updatedQuestion.questionId);
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

    var sortedArray;
      if(this.props.filter === "ResolvedQuestions"){
        sortedArray = sortByResolved(this.props.questionsArray);
      } else if (this.props.filter){
        sortedArray = sortByCategory(this.props.filter, this.props.questionsArray);
      } else {
        sortedArray = sortByMagic(this.props.questionsArray);
      };

    return (
      <div className="questions-container">
        <div className="questions-container-header">
          <span className="course">{this.props.className}</span>
          <span className="lecturer">Prof {this.props.professorName}</span>
          <span className="date">{this.dateNow()}</span>
        </div>
        <p className="questions-title">{sortedArray.length + ' Questions: ' + (this.props.filter==='' ? 'All Topics' : this.props.filter)}</p>
        {this.setColor()}
        {sortedArray.map((question, i) => {
          return(
            <TAQuestion
              reference={question.referenceClass}
              key={question._id}
              id={question._id}
              currentUpVotes={question.upVotes}
              text={question.text}
              email={question.email}
              isResolved={question.isResolved}
              isStarred={question.isStarred}
              tags={question.tags}
              email={question.email}
              creatorFirstname={question.firstname}
              creatorLastName={question.lastname}
              lastname={question.lastname}
              questionCreator={question.username}
              userType={question.userType}
              comments={question.comments}
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
    className: state.classReducer.className,
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
)(TAQuestionsContainer);
