import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addTopic } from '../actions/Actions'


class AddTopic extends Component{
  constructor(props) {
    super(props)
    this.state = {
      topicText: ""
    }

    this.props.socket.on('newTopic', (savedTopic) => {
      this.props.addTopicAction(savedTopic);
    })
  }

  updateTopic(e) {
    this.setState({topicText: e.target.value})
  }

  submitPressed(e) {
    e.preventDefault();
    const data = {
      text: this.state.topicText,
      votes: 0,
      timestamp: Date.now(),
      referenceClass: this.props.classObj._id,
    }
    this.props.socket.emit('newTopic', data);
    this.setState({topicText: ""});
  }

  render() {
    return (
      <div div className="new-topic-container">
        <input
          id="new-topic"
          value={this.state.topicText}
          type="text"
          onChange={(e) => this.updateTopic(e)}
          placeholder="this is test..."
        />
        <div className="new-topic-footer">
          <button id="topic-help">?</button>
          <button id="submit-topic" onClick={(e) => this.submitPressed(e)}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    socket: state.socketReducer.socket,
    classObj: state.classReducer.classState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTopicAction: (savedTopic) => {
      dispatch(addTopic(savedTopic))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTopic);
