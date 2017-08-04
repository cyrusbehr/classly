import React, {Component} from 'react';
import {upVoteQuestion, deleteQuestion} from '../actions/Actions';
import { connect } from 'react-redux';
import $ from 'jquery';


class StudentQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyClicked: false,
      votes: this.props.currentUpVotes,
    };
    this.props.socket.on('upVoteQuestion', (updatedQuestion) => {
      this.props.upVoteQuestionAction(updatedQuestion);
      this.setState({votes: this.props.currentUpVotes})
    })
  }

  componenetDidMount() {
    this.setState({votes: this.props.currentUpVotes})
  }

  handleUpvote(e) {
    if(!this.state.alreadyClicked){
      $(e.target).parent('.question').addClass('question-hover');

      this.setState({votes: this.state.votes + 1})
      this.props.socket.emit('upVoteQuestion', {questionId: this.props.id,
         previousUpVotes: this.props.currentUpVotes, toggle: false});
         this.setState({alreadyClicked: true})
    } else {
      $(e.target).parent('.question').removeClass('question-hover');

      this.setState({votes: this.state.votes - 1})
      this.props.socket.emit('upVoteQuestion', {questionId: this.props.id,
         previousUpVotes: this.props.currentUpVotes, toggle: true});
         this.setState({alreadyClicked: false})
    }
  }

  deleteItem(e) {
    e.preventDefault()
    this.props.deleteQuestionAction(this.props.id);
    console.log('The question id is: ', this.props.id)
    this.props.socket.emit('deleteQuestion', {questionId: this.props.id, reference: this.props.reference})
  }

  render() {
    var isCreator = (this.props.questionCreator === this.props.username)
    return (
      <div className="question">
        <div className="question-body">
          <div className="question-header">Tags: <span className="tag">{this.props.tags}</span></div>
          <div className="question-body"> {this.props.text} </div>
          <div className="question-footer"></div>
        </div>
        <div className="question-upvote-container">
          <div className="upvote-icon-container">
            <svg onClick={(e) => this.handleUpvote(e)} width="38px" height="24px" viewBox="0 0 38 24" version="1.1">
              <polygon
                style={this.state.alreadyClicked ? {'fill':'#00C993'} : {'fill': '#4B4B4B'} }
                id="upvote-icon"
                points="19 -8.8817842e-16 0 18.8571429 4.43333333 23.2571429 19 8.8 33.5666667 23.2571429 38 18.8571429">
              </polygon>
            </svg>
          </div>
          <div className="upvote-number">{this.state.votes}</div>
          {isCreator
            ?
            <button onClick={(e)=> this.deleteItem(e)}>delete</button>
            :
            ""
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    socket: state.socketReducer.socket,
    questionsArray: state.classReducer.classState.questions,
    username: state.userReducer.username,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upVoteQuestionAction: (updatedQuestion) => {
      dispatch(upVoteQuestion(updatedQuestion));
    },
    deleteQuestionAction: (ID) => {
      dispatch(deleteQuestion(ID));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(StudentQuestion);
