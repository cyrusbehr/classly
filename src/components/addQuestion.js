import React, {Component} from 'react'
import { connect } from 'react-redux';

class AddQuestion extends Component{
  constructor(props) {
    super(props)
    this.state = {
      questionText: "",
      tags: "",
    }
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
    return(
      <div>
        This is the add questions componenet
        <br/>
        <input
          value={this.state.questionText}
          type="text"
          onChange={(e) => this.updateQuestion(e)}
          placeholder="New Questions..."
        />
        <br/>
        <input
          value={this.state.tags}
          type="text"
          onChange={(e) => this.updateTags(e)}
          placeholder="Tags (optional)"
        />
        <button onClick={(e) => this.submitPressed(e)}>Ask new question</button>
      </div>
    )
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
