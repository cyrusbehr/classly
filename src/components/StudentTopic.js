import React, { Component } from 'react';
import {connect} from 'react-redux'
import { voteTopic, updateFilter, deleteTopic } from '../actions/Actions';
import $ from 'jquery';

class StudentTopic extends Component {
  constructor(props) {
    super(props);
    this.state={
      hover: false,
      alreadyClicked: false,
      votes: this.props.votes,
      toggle: false,
      filter: ""
    }
    this.props.socket.on('voteTopic', (updatedTopic) => {
      this.props.voteTopicAction(updatedTopic);
      this.setState({votes: this.props.votes});
    });
  }

  handleVote(e) {
    console.log("this is inner click");
    e.stopPropagation();
    e.preventDefault();
    if(!this.state.alreadyClicked) {
      $(e.target).parents('.topic').addClass('topic-hover');

      this.setState({votes: this.state.votes + 1})
      this.props.socket.emit('voteTopic', {topicId: this.props.id,
        previousVotes: this.props.votes, toggle: false})
        this.setState({alreadyClicked: true})
    }else {
      $(e.target).parents('.topic').removeClass('topic-hover');

      this.setState({votes: this.state.votes - 1})
      this.props.socket.emit('voteTopic', {topicId: this.props.id,
        previousVotes: this.props.votes, toggle: true})
        this.setState({alreadyClicked: false})
    }
  }

  handleClick(id,e){
    if(this.props.currentFilter==='' || this.props.currentFilter !== this.props.text){
      this.props.toggleFilter(this.props.text);
    } else {
      this.props.toggleFilter('');
    }
  }

  deleteItem(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.deleteTopicAction(this.props.id)
    this.props.socket.emit('deleteTopic', {topicId: this.props.id, reference: this.props.reference})
  }

  render() {
    var isCreator = (this.props.topicCreator === this.props.username);
    var isCreatorOrProfessorOrTA = (this.props.topicCreator === this.props.username || this.props.userType === 'Professor' || this.props.userType === 'TA');
    var style = {};

    if (this.state.alreadyClicked) {
      style.backgroundColor = '#FFF1F1';
    } else {
      style.backgroundColor = 'white';
    }

    if(this.props.hightlight){
      style.transform = 'scale3d(1.02, 1.02, 1)';
      style.boxShadow = '0 8px 17px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .15)'
    }

    return (
      <div
        className="topic"
        style={style}
        onClick={(e) => this.handleClick(this.props.id,e)}
      >
        <div className="topic-content">
          <div className="topic-title">{this.props.text}</div>
          {this.props.slideNumber
          ?
          <div className="topic-description">Slide Number  {this.props.slideNumber}</div>
          :null
        }
        </div>
        <div className="topic-alert">
          {isCreatorOrProfessorOrTA
            ?
            <span>
            <svg className="delete-topic" onClick={(e)=> this.deleteItem(e)} width="40px" height="40px">
              <path d="M13.172 16L.586 3.414c-.78-.78-.78-2.047 0-2.828.78-.78 2.048-.78 2.828 0L16 13.172 28.586.586c.78-.78 2.047-.78 2.828 0 .78.78.78 2.047 0 2.828L18.828 16l12.586 12.586c.78.78.78 2.047 0 2.828-.78.78-2.048.78-2.828 0L16 18.828 3.414 31.414c-.78.78-2.047.78-2.828 0-.78-.78-.78-2.047 0-2.828L13.172 16z"/>
            </svg>
            <div className="topic-alert-icon topic-alert-icon-delete">
              <button
                onClick={(e) => this.handleVote(e)}
                id="alert"
                style={this.state.hover || this.state.alreadyClicked ? {backgroundColor:'#FF7E65', borderColor: '#FF7E65'} : {'backgroundColor':'#30383E', 'borderColor': '#30383E'} }
                onMouseOver={() => {this.setState({hover:true})}}
                onMouseOut={() => {this.setState({hover:false})}}
                >!</button>
            </div>
          </span>
            :
            <div className="topic-alert-icon">
              <button
                onClick={(e) => this.handleVote(e)}
                id="alert"
                style={this.state.hover || this.state.alreadyClicked ? {backgroundColor:'#FF7E65', borderColor: '#FF7E65'} : {'backgroundColor':'#30383E', 'borderColor': '#30383E'} }
                onMouseOver={() => {this.setState({hover:true})}}
                onMouseOut={() => {this.setState({hover:false})}}
                >!</button>
            </div>
           }


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
    username: state.userReducer.username,
    currentFilter: state.filterReducer,
    userType: state.userReducer.userType,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    voteTopicAction: (updateTopic) => {
      dispatch(voteTopic(updateTopic));
    },
    toggleFilter: (newFilter) => {
      dispatch(updateFilter(newFilter))
    },
    deleteTopicAction: (topicID) => {
      dispatch(deleteTopic(topicID));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentTopic)
