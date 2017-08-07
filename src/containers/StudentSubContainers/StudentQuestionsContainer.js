import React, { Component } from 'react';
import {deleteQuestion} from '../../actions/Actions';
import StudentQuestion from '../../components/StudentQuestion';
import AddQuestion from '../../components/AddQuestion';
import { connect } from 'react-redux';
import _ from 'underscore';


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
  }


  render() {
    var sortedArray = _.sortBy(this.props.questionsArray, (question) => {
      return -1 * question.upVotes; //negative changes to descending order
    })

      var proffArr = this.props.professorName.split(" ")
      var profname = proffArr[1] || proffArr[0]

    return (
      <div className="questions-container">
        <div className="questions-container-header">
          <span className="course">MECH 101</span>
          <span>This is {this.props.userType} view</span>
          <span className="lecturer">Prof {profname}</span>
          <span className="date">1st Aug 2017</span>
        </div>
        <AddQuestion />
        {sortedArray.map((question, i) => {
          // console.log("this is the filter: ", this.props.filter);
          // console.log("this is question.tags[0]", question.tags[0]);
          if (!this.props.filter) {
            return(
              <StudentQuestion
                reference={question.referenceClass}
                key={question._id}
                id={question._id}
                currentUpVotes={question.upVotes}
                text={question.text}
                tags={question.tags}
                questionCreator={question.username}
              />
            )
          } else {
            if(this.props.filter === question.tags[0]){
              return(
                <StudentQuestion
                  key={question._id}
                  id={question._id}
                  currentUpVotes={question.upVotes}
                  text={question.text}
                  tags={question.tags}
                />
              )
            } else {
              return(<span></span>)
            }
          }
        })}
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteQuestionAction: (ID) => {
      dispatch(deleteQuestion(ID));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentQuestionsContainer);
