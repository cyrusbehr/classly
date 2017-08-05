import React, { Component } from 'react';
import {connect} from 'react-redux'
import { voteTopic, updateFilter } from '../actions/Actions';
import $ from 'jquery';

class StudentTopic extends Component {
  constructor(props) {
    super(props);
    this.state={
      hover: false,
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
      $(e.target).parents('.topic').addClass('animated pulse');

      this.setState({votes: this.state.votes + 1})
      this.props.socket.emit('voteTopic', {topicId: this.props.id,
        previousVotes: this.props.votes, toggle: false})
        this.setState({alreadyClicked: true})
    }else {
      $(e.target).parents('.topic').removeClass('animated pulse');

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
      <div className="topic" style={this.state.alreadyClicked ? {backgroundColor: '#FFF1F1'} : {backgroundColor:'white'}} onClick={() => this.handleClick(this.props.id)}>
        <div className="topic-content">
          <div className="topic-title">{this.props.text}</div>
          <div className="topic-description">Powerpoint slides p.1-10</div>
        </div>
        <div className="topic-alert">
          <div className="topic-alert-icon">
            <button
              onClick={(e) => this.handleVote(e)}
              id="alert"
              style={this.state.hover || this.state.alreadyClicked ? {backgroundColor:'#FF7E65', borderColor: '#FF7E65'} : {'backgroundColor':'#30383E', 'borderColor': '#30383E'} }
              onMouseOver={() => {this.setState({hover:true})}}
              onMouseOut={() => {this.setState({hover:false})}}
              >!</button>
          </div>
          <div
            className="topic-alert-number"
            style={this.state.hover || this.state.alreadyClicked ? {color: '#FF7E65'} : {color:'#30383E'}}
          >{this.state.votes}</div>
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
