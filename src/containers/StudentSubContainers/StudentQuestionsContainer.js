import React, { Component } from 'react';
import StudentQuestion from '../../components/StudentQuestion';
import AddQuestion from '../../components/AddQuestion';
import { connect } from 'react-redux';
import _ from 'underscore'


class StudentQuestionsContainer extends Component {

  render() {

      var sortedArray = _.sortBy(this.props.questionsArray, (question) => {
        return -1 * question.upVotes; //negative changes to descending order
      })

    return (
      <div className="questions-container">

        <div className="questions-container-header">
          <span className="date">1st Aug 2017</span>
        </div>
        <AddQuestion />
<<<<<<< HEAD
          {this.props.questionsArray.map((question, i) => {
            return(
              <StudentQuestion
                key={i}
                id={question._id}
                currentUpVotes={question.upVotes}
                text={question.text}
                tags={question.tags}
                i={i}
              />
            )
          })}
=======
        {sortedArray.map((question, i) => {
          return(
            <StudentQuestion
              key={question._id}
              id={question._id}
              currentUpVotes={question.upVotes}
              text={question.text}
              tags={question.tags}
              i={i}
            />
          )
        })}
>>>>>>> ce202c8d007722c117e0a21990b99f97a90e1638
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    questionsArray: state.classReducer.classState.questions
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentQuestionsContainer);
