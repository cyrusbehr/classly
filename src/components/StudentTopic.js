import React, { Component } from 'react';
import {connect} from 'react-redux'
import { voteTopic, updateFilter } from '../actions/Actions';

class StudentTopic extends Component {
  constructor(props) {
    super(props);
    this.state={
      alreadyClicked: false,
      votes: this.props.votes,
      toggle: false,
    }
    this.props.socket.on('voteTopic', (updatedTopic) => {
      this.props.voteTopicAction(updatedTopic);
      this.setState({votes: this.props.votes});
    })
  }

  handleVote(e) {
    console.log("this is inner click");
    e.stopPropagation();
    e.preventDefault();
    if(!this.state.alreadyClicked) {
      this.setState({votes: this.state.votes + 1})
      this.props.socket.emit('voteTopic', {topicId: this.props.id,
        previousVotes: this.props.votes, toggle: false})
        this.setState({alreadyClicked: true})
    }else {
      this.setState({votes: this.state.votes - 1})
      this.props.socket.emit('voteTopic', {topicId: this.props.id,
        previousVotes: this.props.votes, toggle: true})
        this.setState({alreadyClicked: false})
    }
  }

  handleClick(id){
    //event propogation
    if(this.state.toggle){
      this.props.toggleFilter("");
      this.setState({toggle: false});
    } else {
      this.props.toggleFilter(this.props.text);
      this.setState({toggle: true});
    }
  }

  render() {
    return (
      <div className="topic" onClick={() => this.handleClick(this.props.id)}>
        <div className="topic-content">
          <div className="topic-title">{this.props.text}</div>
          <div className="topic-description">Powerpoint slides p.1-10</div>
        </div>
        <div className="topic-alert">
          <div className="topic-alert-icon"><button onClick={(e) => this.handleVote(e)} id="alert">!</button></div>
          <div className="topic-alert-number">{this.state.votes}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socketReducer.socket,
    username: state.userReducer.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    voteTopicAction: (updateTopic) => {
      dispatch(voteTopic(updateTopic));
    },
    toggleFilter: (newFilter) => {
      dispatch(updateFilter(newFilter))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentTopic)
