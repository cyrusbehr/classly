import React, { Component } from 'react';
import StudentQuestion from '../../components/StudentQuestion';
import AddQuestion from '../../components/AddQuestion';
import { connect } from 'react-redux';
import _ from 'underscore';


class TAQuestionsContainer extends Component {
  constructor(props) {
    super(props)
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
          <span className="course">{this.props.className}</span>
          <span className="lecturer">Prof {profname}</span>
          <span className="date">1st Aug 2017</span>
        </div>
        <AddQuestion />
        {sortedArray.map((question, i) => {
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
    questionsArray: state.classReducer.classState.questions,
    professorName: state.classReducer.classState.professorName,
    filter: state.filterReducer,
    className: state.classReducer.classState.className,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TAQuestionsContainer);
