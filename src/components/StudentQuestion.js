import React, {Component} from 'react';
import {upVoteQuestion} from '../actions/Actions';
import { connect } from 'react-redux';


class StudentQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyClicked: false
    }
    this.props.socket.on('upVoteQuestion', (updatedQuestion) => {
      this.props.upVoteQuestionAction(updatedQuestion);
    })
  }

  handleUpvote() {
    if(!this.state.alreadyClicked){
      this.props.socket.emit('upVoteQuestion', {questionId: this.props.id,
         previousUpVotes: this.props.currentUpVotes});
      this.state.alreadyClicked = true;
      console.log("upvoted question: ", this.props.id);
    } else {
      console.log("This button has already been pressed");
    }
  }

  render() {
    return (
      <div className="question">
        <div className="question-body">
          <div className="question-header">Tags: <span className="tag">{this.props.tags}</span></div>
          <div className="question-body"> {this.props.text} </div>
          <div className="question-footer"></div>
        </div>
        <div className="question-upvote-container">
          <div className="upvote-icon-container" onClick={() => this.handleUpvote()}>
            <svg width="38px" height="24px" viewBox="0 0 38 24" version="1.1">
              <polygon id="upvote-icon" points="19 -8.8817842e-16 0 18.8571429 4.43333333 23.2571429 19 8.8 33.5666667 23.2571429 38 18.8571429"></polygon>
            </svg>
          </div>
          <div className="upvote-number">{this.props.currentUpVotes}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    socket: state.socketReducer.socket,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upVoteQuestionAction: (updatedQuestion) => {
      dispatch(upVoteQuestion(updatedQuestion));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(StudentQuestion);
