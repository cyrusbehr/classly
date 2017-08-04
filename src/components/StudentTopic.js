import React, { Component } from 'react';
import {connect} from 'react-redux'
import { voteTopic } from '../actions/Actions';

class StudentTopic extends Component {
  constructor(props) {
    super(props);
    this.state={
      alreadyClicked: false
    }
    this.props.socket.on('voteTopic', (updatedTopic) => {
      console.log("")
      this.props.voteTopicAction(updatedTopic);
    })
  }

  handleVote(e) {
    e.preventDefault()
    if(!this.state.alreadyClicked) {
      this.props.socket.emit('voteTopic', {topicId: this.props.id,
        previousVotes: this.props.votes, toggle: false})
        this.setState({alreadyClicked: true})
    }else {
      this.props.socket.emit('voteTopic', {topicId: this.props.id,
        previousVotes: this.props.votes, toggle: true})
        this.setState({alreadyClicked: false})
    }
  }

  render() {
    return (
      <div className="topic">
        <div className="topic-content">
          <div className="topic-title">{this.props.text}</div>
          <div className="topic-description">Powerpoint slides p.1-10</div>
        </div>
        <div className="topic-alert">
          <div className="topic-alert-icon"><button onClick={(e) => this.handleVote(e)} id="alert">!</button></div>
          <div className="topic-alert-number">{this.props.votes}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socketReducer.socket
  }
}

const mapDispatchToProps = dispatch => {
  return {
    voteTopicAction: (updateTopic) => {
      dispatch(voteTopic(updateTopic));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentTopic)
