import React, {Component} from 'react';
import {upVoteQuestion} from '../actions/Actions';
import { connect } from 'react-redux';
import $ from 'jquery';


class StudentQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyClicked: false
    };
    this.props.socket.on('upVoteQuestion', (updatedQuestion) => {

      this.props.upVoteQuestionAction(updatedQuestion);
    })
  }

  handleUpvote() {
    if(!this.state.alreadyClicked){
      this.props.socket.emit('upVoteQuestion', {questionId: this.props.id,
         previousUpVotes: this.props.currentUpVotes, toggle: false});
      this.state.alreadyClicked = true;

      console.log("toggled upVotequestion: ", this.props.id);
    } else {
      this.props.socket.emit('upVoteQuestion', {questionId: this.props.id,
         previousUpVotes: this.props.currentUpVotes, toggle: true});
      this.state.alreadyClicked = false;

      console.log("toggled upVotequestion: ", this.props.id);
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
          <div className="upvote-icon-container">
            <svg onClick={() => this.handleUpvote()} width="38px" height="24px" viewBox="0 0 38 24" version="1.1">
              <polygon
                style={this.state.alreadyClicked ? {'fill':'#00C993'} : {'fill': '#4B4B4B'} }
                id="upvote-icon"
                points="19 -8.8817842e-16 0 18.8571429 4.43333333 23.2571429 19 8.8 33.5666667 23.2571429 38 18.8571429">
              </polygon>
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
    questionsArray: state.classReducer.classState.questions,
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
