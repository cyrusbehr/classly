import React, { Component } from 'react';
import TAQuestion from '../../components/TAQuestion';
import AddQuestion from '../../components/AddQuestion';
import { connect } from 'react-redux';
import _ from 'underscore';
import {addComment, deleteQuestion, upVoteQuestion, toggleStar, toggleResolve} from '../../actions/Actions';
import {sortByMagic, sortByCategory} from '../../constants/algorithmicos';


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
          <span className="lecturer">Prof {profname}</span>
          <span className="date">1st Aug 2017</span>
        </div>
        <AddQuestion />
        <p className="question-title">{sortedArray.length + ' Questions: ' + (this.props.filter==='' ? 'All Topics' : this.props.filter)}</p>
        {sortedArray.map((question, i) => {
          return(
            <TAQuestion
              reference={question.referenceClass}
              key={question._id}
              id={question._id}
              currentUpVotes={question.upVotes}
              text={question.text}
              isResolved={question.isResolved}
              isStarred={question.isStarred}
              tags={question.tags}
              questionCreator={question.username}
              userType={question.userType}
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
    className: state.classReducer.classState.className,
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
