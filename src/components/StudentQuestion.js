import React, {Component} from 'react';
import {upVoteQuestion, toggleStar, toggleResolve, deleteQuestion, addComment} from '../actions/Actions';
import { connect } from 'react-redux';
import $ from 'jquery';


class StudentQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      alreadyClicked: false,
      votes: this.props.currentUpVotes,
      commentText: ""
    };
    this.props.socket.on('upVoteQuestion', (updatedQuestion) => {
      this.props.upVoteQuestionAction(updatedQuestion);
      this.setState({votes: this.props.currentUpVotes})
    });
    this.props.socket.on('toggleStar', (updatedQuestion) => {
      this.props.toggleStarAction(updatedQuestion._id);
    });
    this.props.socket.on('toggleResolve', (updatedQuestion) => {
      this.props.toggleResolveAction(updatedQuestion._id);
    });
  }

  componenetDidMount() {
    this.setState({votes: this.props.currentUpVotes})
  }

  handleUpvote(e) {
    if(!this.state.alreadyClicked){
      this.setState({votes: this.state.votes + 1})
      this.props.socket.emit('upVoteQuestion', {questionId: this.props.id, previousUpVotes: this.props.currentUpVotes, toggle: false});
      this.setState({alreadyClicked: true});
    } else {
      this.setState({votes: this.state.votes - 1})
      this.props.socket.emit('upVoteQuestion', {questionId: this.props.id, previousUpVotes: this.props.currentUpVotes, toggle: true});
      this.setState({alreadyClicked: false});
    }
  }

  deleteItem(e) {
    e.preventDefault()
    this.props.deleteQuestionAction(this.props.id);
    console.log('The question id is: ', this.props.id)
    this.props.socket.emit('deleteQuestion', {questionId: this.props.id, reference: this.props.reference});
  }

  toggleThisStar(e) {
    e.preventDefault();
    this.props.toggleStarAction(this.props.id);
    // this.setState({starred: !this.state.starred});
    this.props.socket.emit('toggleStar', {questionId: this.props.id, isStarred: this.props.isStarred});
  }

  toggleThisResolve(e) {
    e.preventDefault();
    this.props.toggleResolveAction(this.props.id);
    this.props.socket.emit('toggleResolve', {questionId: this.props.id, isResolved: this.props.isResolved});
  }

  updateCommentText(e) {
    this.setState({commentText: e.target.value})
  };

  replyButtonPressed(e) {
    e.preventDefault();
    let newCommentObj = {
      questionId: this.props.id,
      text: this.state.commentText,
      creator: this.props.username
    }
    this.props.addCommentAction(newCommentObj);
    this.props.socket.emit('newComment', {questionId: this.props.id,
       username: this.props.username, text: this.state.commentText});
    this.setState({commentText: ""});
  }

  render() {
    var isCreatorOrProfessorOrTA = (this.props.questionCreator === this.props.username || this.props.userType === 'Professor' || this.props.userType === 'TA');
    if(this.props.studentName){
      var nameArr = this.props.studentName.split(' ');
      var renderStudentName = nameArr[0];
    }
    var isProfessorOrTA = (this.props.userType === 'Professor' || this.props.userType === 'TA');
    var isTA = (this.props.userType === "TA" || this.props.userType === "Professor");
    return (
      <div className="question" style={this.state.alreadyClicked ? {backgroundColor:'#D9FFF5'} : {backgroundColor:'white'} }>
        <div className="question-body">
          <div className="question-header"> Tags: {this.props.tags[0]==="" ? ' None' : <span className="tag">{this.props.tags}</span>}</div>
          <div className="question-content"> {this.props.text} </div>

        {/*  TODO: DONOVAN add formating here, feel free to move this around */}
        {console.log("The comments are: ", this.props.comments)}
        {this.props.comments ? this.props.comments.map((comment) => {
          return(
          <div>{comment.creator}: {comment.text}</div>
          )
        })
        :null
      }

          {isTA
            ?
            <div className="question-footer">
              <button onClick={(e) => this.replyButtonPressed(e)}>Reply</button>
              <input
                value={this.state.commentText}
                type="text"
                onChange={(e) => this.updateCommentText(e)}
                placeholder="New Question..."
              />
            </div>
            : null }
          {(this.props.studentName ? <div> - {renderStudentName}</div> : <div></div>)}
        </div>
        {isProfessorOrTA
          ?
          <div>
            <div className="upvote-number">{this.state.votes}</div>
            <button onClick={(e)=> this.toggleThisStar(e)}>Star</button>
            <button onClick={(e)=> this.toggleThisResolve(e)}>Resolve</button>
          </div>
          :
          null
        }
        {isCreatorOrProfessorOrTA
          ?
          <button onClick={(e)=> this.deleteItem(e)}>delete</button>
          :
          <div className="question-upvote-container">
            <div className="upvote-icon-container">
              <svg
                onClick={(e) => this.handleUpvote(e)}
                onMouseOver={() => {this.setState({hover:true})}}
                onMouseOut={() => {this.setState({hover:false})}}
                width="38px"
                height="24px"
                viewBox="0 0 38 24"
                version="1.1"
                >
                  <polygon
                    style={this.state.hover || this.state.alreadyClicked ? {'fill':'#00C993'} : {'fill': '#4B4B4B'} }
                    id="upvote-icon"
                    points="19 -8.8817842e-16 0 18.8571429 4.43333333 23.2571429 19 8.8 33.5666667 23.2571429 38 18.8571429">
                  </polygon>
                </svg>
              </div>
              <div className="upvote-number" style={this.state.hover || this.state.alreadyClicked ? {color: '#00C993'} : {color:'#4B4B4B'}}> {this.state.votes} </div>
            </div> }
            <div>
              { this.props.isStarred ? <span>starred!</span> : null }
              { this.props.isResolved ? <div>resolved!</div> : null }
          </div>
          <div className="delete-button-container">
            {isCreatorOrProfessorOrTA
              ?
              <svg className="delete-question" onClick={(e)=> this.deleteItem(e)} width="40px" height="40px">
                <path d="M13.172 16L.586 3.414c-.78-.78-.78-2.047 0-2.828.78-.78 2.048-.78 2.828 0L16 13.172 28.586.586c.78-.78 2.047-.78 2.828 0 .78.78.78 2.047 0 2.828L18.828 16l12.586 12.586c.78.78.78 2.047 0 2.828-.78.78-2.048.78-2.828 0L16 18.828 3.414 31.414c-.78.78-2.047.78-2.828 0-.78-.78-.78-2.047 0-2.828L13.172 16z"/>
              </svg>
              :
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
    questionsArray: state.classReducer.classState.questions,
    username: state.userReducer.username,
    userType: state.userReducer.userType,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upVoteQuestionAction: (updatedQuestion) => {
      dispatch(upVoteQuestion(updatedQuestion));
    },
    deleteQuestionAction: (ID) => {
      dispatch(deleteQuestion(ID));
    },
    addCommentAction: (newQuestionObject) => {
      dispatch(addComment(newQuestionObject))
    },
    toggleStarAction: (ID) => {
      dispatch(toggleStar(ID))
    },
    toggleResolveAction: (ID) => {
      dispatch(toggleResolve(ID))
    }
}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(StudentQuestion);
