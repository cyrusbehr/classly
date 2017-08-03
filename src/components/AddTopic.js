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
      console.log("newTopic listern was triggered");
      this.props.addTopicAction(savedTopic);
    })
  }

  updateTopic(e) {
    this.setState({topicText: e.target.value})
  }

  submitPressed(e) {
    console.log("this is submit pressed");
    e.preventDefault();
    const data = {
      text: this.state.topicText,
      votes: this.props.currentVotes,
      timestamp: Date.now(),
      referenceClass: this.props.classObj._id,
    }
    this.props.socket.emit('newTopic', data);
    this.setState({
      questionText: "",
    });
  }

  render() {
    return (
      <div>
        <div>
          <input
            id="new-topic"
            value={this.state.topicText}
            type="text"
            onChange={(e) => this.updateTopic(e)}
            placeholder="New Topic..."
          />
        </div>
        <div>
          <button>?</button>
          <button onClick={(e) => this.submitPressed(e)}>Submit</button>
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
