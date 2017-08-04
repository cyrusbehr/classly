import React, { Component } from 'react';
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
  }

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
        {sortedArray.map((question, i) => {
          // console.log("this is the filter: ", this.props.filter);
          // console.log("this is question.tags[0]", question.tags[0]);
          if (this.props.filter !== "") {
            if(this.props.filter === question.tags[0]){
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
            return
          }
        } else {
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
        }
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    questionsArray: state.classReducer.classState.questions,
    filter: state.filterReducer,
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
