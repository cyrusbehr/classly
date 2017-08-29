import React, {Component} from 'react';
import {likeQuestion, toggleStar, toggleResolve, deleteQuestion, addComment} from '../actions/Actions';
import { connect } from 'react-redux';
import $ from 'jquery';
import ReactTooltip from 'react-tooltip';

class TAQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      votes: this.props.currentUpVotes,
      commentText: "",
      toggle: true,
      processing: false
    };
    this.props.socket.on('upVoteQuestion', (updatedQuestion) => {
      this.setState({votes: this.props.currentUpVotes, processing: false})
    });
  }

  componenetDidMount() {
    this.setState({votes: this.props.currentUpVotes});
  }

  onTestChange(e) {
   if (e.which === 13) {
     this.replyButtonPressed(e)
   }
 }

 handleUpvote(e, questionId) {
   if(this.state.processing) return
   this.setState({processing: true});
   if(this.props.likedQuestions.indexOf(questionId) === -1){
     this.setState({votes: this.state.votes + 1})
     this.props.likeQuestionAction(questionId, "UP");
     this.props.socket.emit('upVoteQuestion', {questionId: this.props.id, previousUpVotes: this.props.currentUpVotes,
        toggle: false, userID: this.props.user._id});
   } else {
     this.setState({votes: this.state.votes - 1})
     this.props.socket.emit('upVoteQuestion', {questionId: this.props.id, previousUpVotes: this.props.currentUpVotes,
        toggle: true, userID: this.props.user._id});
     this.props.likeQuestionAction(questionId, "DOWN");
   }
 }

  deleteItem(e) {
    e.preventDefault()
    this.props.deleteQuestionAction(this.props.id);
    this.props.socket.emit('deleteQuestion', {questionId: this.props.id, reference: this.props.reference, userID: this.props.user._id});
  }

  toggleThisStar(e) {
    e.preventDefault();
    this.props.toggleStarAction(this.props.id);
    this.props.socket.emit('toggleStar', {questionId: this.props.id, isStarred: this.props.isStarred});
  }

  toggleThisResolve(e) {
    e.preventDefault();
    this.props.toggleResolveAction(this.props.id);
    this.props.socket.emit('toggleResolve', {questionId: this.props.id, isResolved: this.props.isResolved});
  }

  updateCommentText(e) {
    this.setState({commentText: e.target.value});
  };

  replyButtonPressed(e) {
    e.preventDefault();
    if(this.state.commentText === "") return;
    let newCommentObj = {
      questionId: this.props.id,
      text: this.state.commentText,
      creator: this.props.firstname + " " + this.props.lastname,
      title: 'TA'
    }
    this.props.addCommentAction(newCommentObj);
    this.props.socket.emit('newComment', {questionId: this.props.id,
      username: this.props.firstname + " " + this.props.lastname, text: this.state.commentText, title: 'TA'});
      this.setState({commentText: ""});
    }

    toggleReply(e) {
        e.preventDefault();
        if(this.state.toggle === false){
          this.setState({toggle: true});
        } else {
          this.setState({toggle: false})
          $(e.target).parents('.question').find('.question-comment-textarea').focus();
        }
      }

    render() {
      var isAlreadyClicked = (this.props.likedQuestions.indexOf(this.props.id) !== -1)

      var style = {};
      if(isAlreadyClicked){ //TODO: this needs fixing
        style.backgroundColor = '#D9FFF5';
      } else {
        style.backgroundColor = 'white';
      }

      if(this.props.isResolved){
        style.backgroundColor = 'lightgray';
      }

      var darkGreenStyle = {
        color: '#10a02a',
        fontSize: 30,
      }
      return (
        <div className="question" style={style}>
          <div className="question-main-section">
            <div className="question-body">
              <div className="question-header">{this.props.tags[0]==="" ? null : <span className="tag" style={{background: this.props.color}}>#{this.props.tags}</span>}</div>
              <div className="question-content"> {this.props.text} </div>
              <div className="question-main-section-question-creator"> - {this.props.creatorFirstname + " " + this.props.creatorLastName}</div>
            </div>

            <div className="all-buttons-container">
              <div className="question-upvote-container">
                <div className="upvote-icon-container">
                  <i
                    id="upvote-icon"
                    className="material-icons"
                    onClick={(e) => this.handleUpvote(e, this.props.id)}
                    >keyboard_arrow_up</i>
                    {this.state.votes}
                  </div>
                  <div className="upvote-number">
                    <i
                      id="reply-icon"
                      className="material-icons"
                      onClick={(e) => this.toggleReply(e)}
                      >chat</i>
                      {this.props.comments.length}
                    </div>
                    {this.props.isResolved
                      ?
                      <div
                        className="resolve"
                        style={darkGreenStyle}
                        onClick={(e)=> this.toggleThisResolve(e)}
                        >Resolved</div>
                    : null }
                  </div>

                  <div className="delete-button-container">
                    <svg className="delete-question" onClick={(e)=> this.deleteItem(e)} width="40px" height="40px">
                      <path d="M13.172 16L.586 3.414c-.78-.78-.78-2.047 0-2.828.78-.78 2.048-.78 2.828 0L16 13.172 28.586.586c.78-.78 2.047-.78 2.828 0 .78.78.78 2.047 0 2.828L18.828 16l12.586 12.586c.78.78.78 2.047 0 2.828-.78.78-2.048.78-2.828 0L16 18.828 3.414 31.414c-.78.78-2.047.78-2.828 0-.78-.78-.78-2.047 0-2.828L13.172 16z"/>
                    </svg>
                    <div>
                      <svg
                        className="star"
                        width="40px"
                        height="40px"
                        style={this.props.isStarred ? {fill:'#FF7E65'} : {}}
                        onClick={(e)=> this.toggleThisStar(e)}
                        data-tip
                        data-for='star'
                        >
                          <path d="M16 .7c-.4 0-.7.2-.9.6l-4.4 8.9-9.8 1.4c-.4.1-.7.4-.9.7-.1.4 0 .8.3 1l7.1 6.9L5.7 30c-.1.4.1.8.4 1 .2.1.4.2.6.2.2 0 .3 0 .5-.1l8.8-4.6 8.8 4.6c.1.1.3.1.5.1s.4-.1.6-.2c.3-.2.5-.6.4-1l-1.7-9.8 7.1-6.9c.3-.3.4-.7.3-1-.1-.4-.4-.6-.8-.7l-9.9-1.4-4.4-8.9c-.2-.4-.5-.6-.9-.6z"/>
                        </svg>
                        <ReactTooltip id='star' type='warning'>
                          <span>Pin question</span>
                        </ReactTooltip>

                        <svg
                          className="resolve"
                          width="40px"
                          height="40px"
                          style={this.props.isResolved ? {fill:'green'} : {}}
                          onClick={(e)=> this.toggleThisResolve(e)}
                          data-tip
                          data-for='resolve'
                          >
                            <path d="M10 28c-.512 0-1.024-.195-1.414-.586l-8-8c-.78-.78-.78-2.047 0-2.828.78-.78 2.048-.78 2.828 0L10 23.172 28.586 4.586c.78-.78 2.047-.78 2.828 0 .78.78.78 2.047 0 2.828l-20 20c-.39.39-.902.586-1.414.586z"/>
                          </svg>
                          <ReactTooltip id='resolve' type='success'>
                            <span>Mark as resolved</span>
                          </ReactTooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="question-comment-section">
                    <div className={this.state.toggle ? "question-footer" : "question-footer-1"}>
                      <div className="question-comments-container">
                        <div className="question-comments-container-spacer">
                        </div>
                        <div className="question-comments-container-main">
                          <div className="comment-section-header">{this.props.comments.length} Replies</div>
                          {this.props.comments ? this.props.comments.map((comment, index) => {
                            return(
                              <div key={index}>
                                <div><text className="highlight-teacher-ta">{comment.title} </text><text className="comment-creator">{' ' + comment.creator}: </text></div>
                                <div className="comment">{comment.text}</div>
                              </div>
                            )
                          })
                          :null
                        }
                      </div>
                    </div>
                    <div className="question-comment-container-wrapper">
                      <div className="question-comments-container-spacer">
                      </div>
                      <div className="question-comment-container">
                        <textarea
                          onKeyPress={(e) => this.onTestChange(e)}
                          value={this.state.commentText}
                          type="text"
                          onChange={(e) => this.updateCommentText(e)}
                          placeholder="Add a reply..."
                          className="question-comment-textarea"
                        />
                        <button className="question-comment-button" onClick={(e) => this.replyButtonPressed(e)}>Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        }

        const mapStateToProps = state => {

          return {
            user: state.userReducer.user,
            socket: state.socketReducer.socket,
            questionsArray: state.classReducer.questions,
            userType: state.userReducer.userType,
            firstname: state.userReducer.user.firstname,
            lastname: state.userReducer.user.lastname,
            likedQuestions: state.userReducer.user.likedQuestions,
          }
        }

        const mapDispatchToProps = dispatch => {
          return {
            deleteQuestionAction: (ID) => {
              dispatch(deleteQuestion(ID));
            },
            toggleStarAction: (ID) => {
              dispatch(toggleStar(ID))
            },
            toggleResolveAction: (ID) => {
              dispatch(toggleResolve(ID))
            },
            addCommentAction: (newComment) => {
              dispatch(addComment(newComment))
            },
            likeQuestionAction: (questionId, direction) => {
              dispatch(likeQuestion(questionId, direction));
            }
          }
        }

        export default connect(
          mapStateToProps,
          mapDispatchToProps)(TAQuestion);
