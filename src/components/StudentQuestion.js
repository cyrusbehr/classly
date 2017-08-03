import React, {Component} from 'react';
import upVoteQuestion from '../actions/Actions';
import { connect } from 'react-redux';


class StudentQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyClicked: false
    }
    this.props.socket.on('upVoteQuestion', (updatedQuestion) => {
      this.props.upVoteQuestionAction(updatedQuestion);
    })
  }

  handleUpvote() {
    if(!this.state.alreadyClicked){
      this.props.socket.emit('upVoteQuestion', {questionId: this.props.id,
         previousUpVotes: this.props.currentUpVotes});
      this.state.alreadyClicked = true;
      console.log("upvoted question: ", this.props.id);
    } else {
      console.log("This button has already been pressed");
    }
  }

  render() {
    return(
      <div>
       {this.props.text}
       <button onClick={() => this.handleUpvote()}>
      upvote
      </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socketReducer.socket
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upVoteQuestionAction: (updatedQuestion) => {
      dispatch(upVoteQuestion(updatedQuestion));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(StudentQuestion);
