import React, { Component } from 'react';
import StudentQuestion from '../../components/StudentQuestion';
import AddQuestion from '../../components/AddQuestion';
import { connect } from 'react-redux';

class StudentQuestionsContainer extends Component {

  render() {
    return (
      <div className="questions-container">

        <div className="questions-container-header">
          <span className="date">1st Aug 2017</span>
        </div>

        <AddQuestion />
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
