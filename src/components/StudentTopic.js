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

  handleClick(id, e) {
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
    var questions = this.props.questions;
    var questionsWithTheTopic = questions.filter((question)=>{
      return question.tags.includes(this.props.text);
    })

    var isCreator = (this.props.user.email === this.props.email);
    var isCreatorOrProfessorOrTA = (this.props.email === this.props.user.email || this.props.user.userType === 'Professor' || this.props.user.userType === 'TA') && !this.props.isDefault;
    var style = {};

    if(this.props.hightlight){
      style.transform = 'scale3d(1.02, 1.02, 1)';
      style.boxShadow = '0 8px 17px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .15)'
    }

    if(this.props.greyOut){
      style['backgroundColor'] = 'lightgray';
    }

    if(this.props.color){
      style['borderLeft'] = this.props.color + ' solid 7px';
    }

    // if(this.props.isDefault === true){
    //   style.minHeight = '30px';
    //   style.fontSize = 14;
    // }
    // var allTopicsGreyedOut = this.props.text === "All Topics" && this.props.greyOut;
    // var isAllTopics = this.props.text === "All Topics"

    return (
      <div
        className="topic"
        style={style}
        onClick={(e) => this.handleClick(this.props.id,e)}
      >
        <div className="topic-content">
          <div className="topic-title" style={this.props.greyOut ? {'color':'darkgray'} : {}}>{'#' + this.props.text}</div>
        </div>
        <div className="topic-alert">
         <div className="topic-alert-icon">
           <i className="material-icons">help_outline</i>
         </div>
          <div className="topic-alert-number">
            {questionsWithTheTopic.length}
          </div>
        </div>
        <div className='delete-topic'>
          {
            isCreatorOrProfessorOrTA ?
            <i
              className="material-icons"
              onClick={(e)=> this.deleteItem(e)}
            >clear</i> :
            null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socketReducer.socket,
    user: state.userReducer.user,
    currentFilter: state.filterReducer,
    userType: state.userReducer.userType,
    questions: state.classReducer.classState.questions,
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
