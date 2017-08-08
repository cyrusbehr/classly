import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addTopic } from '../actions/Actions'

class AddTopic extends Component{
  constructor(props) {
    super(props)
    this.state = {
      topicText: "",
      topicEmpty: true
    }

    this.props.socket.on('newTopic', (savedTopic) => {
      this.props.addTopicAction(savedTopic);
    })
  }

  updateTopic(e) {
    this.setState({topicText: e.target.value})
    this.setState({topicEmpty: true});
  }

  submitPressed(e) {
    e.preventDefault();
    if(this.state.topicText.trim() === ''){
      this.setState({topicEmpty: false});
    } else {
      const data = {
        text: this.state.topicText,
        votes: 0,
        timestamp: Date.now(),
        referenceClass: this.props.classObj._id,
        username: this.props.username,
      }
      this.props.socket.emit('newTopic', data);
      this.setState({topicText: ""});
    }
  }

  render() {
    return (
      <div div className="new-topic-container">
        <input
          id= {this.state.topicEmpty ? "new-topic" : "empty-new-topic"}
          value={this.state.topicText}
          type="text"
          onChange={(e) => this.updateTopic(e)}
          placeholder="this is test..."
        />
        {this.state.topicEmpty ?
          <div className="new-topic-footer">
            <button id="topic-help">?</button>
            <button id="submit-topic" onClick={(e) => this.submitPressed(e)}>Submit</button>
          </div> :
          <div className="empty-new-topic-footer">
            <div className="empty-new-topic-alert">
              Topic can't be empty!
            </div>
            <div className="empty-new-topic-container">
              <button id="topic-help">?</button>
              <button id="submit-topic" onClick={(e) => this.submitPressed(e)}>Submit</button>
            </div>
          </div>
        }
        {/* <div className="new-topic-footer">
          <button id="topic-help">?</button>
          <button id="submit-topic" onClick={(e) => this.submitPressed(e)}>Submit</button>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    socket: state.socketReducer.socket,
    classObj: state.classReducer.classState,
    username: state.userReducer.username,
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
