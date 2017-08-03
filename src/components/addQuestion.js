import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addQuestion } from '../actions/Actions'


class AddQuestion extends Component{
  constructor(props) {
    super(props)
    this.state = {
      questionText: "",
      tags: "",
    }

    this.props.socket.on('newQuestion', (savedQuestion) => {
      console.log("This was triggered")
      this.props.addQuestionAction(savedQuestion);
    })
  }

updateTags(e) {
    this.setState({tags: e.target.value})
}

updateQuestion(e) {
  this.setState({questionText: e.target.value})
}

submitPressed(e) {
  e.preventDefault()
  let tags;
  if(this.state.tags === "") {
    tags = null;
  } else {
    tags = this.state.tags
  }

  const data = {
    text: this.state.questionText,
    username:this.props.username,
    tags: this.state.tags,
    referenceClass: this.props.classObj._id,
    isResolved: false,
    isStarred: false,
    upVotes: 0,
    timestamp: Date.now(),
  }
  this.props.socket.emit('newQuestion', data);
}

  render() {
    return (
      <div className="new-question-container">
        <div className="new-question-input-field">
          <input
            id="new-question"
            value={this.state.questionText}
            type="text"
            onChange={(e) => this.updateQuestion(e)}
            placeholder="New Question..."
          />
          <input
            id="tag"
            value={this.state.tags}
            type="text"
            onChange={(e) => this.updateTags(e)}
            placeholder="Tags (optional)"
          />
        </div>
        <div className="new-question-footer">
          <button id="question-help">?</button>
          <button id="submit-question" onClick={(e) => this.submitPressed(e)}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    socket: state.socketReducer.socket,
    username: state.userReducer.username,
    classObj: state.classReducer.classState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addQuestionAction: (newQuestion) => {
      dispatch(addQuestion(newQuestion))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddQuestion);
