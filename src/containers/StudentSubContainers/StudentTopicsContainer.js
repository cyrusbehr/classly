import React, { Component } from 'react';
// import StudentNewTopic from '../../components/StudentNewTopic';
import { deleteTopic, addComment, updateFilter } from '../../actions/Actions';
import StudentTopic from '../../components/StudentTopic';
// import AddTopic from '../../components/AddTopic';
import { connect } from 'react-redux';
import { Toggle } from 'material-ui';

class StudentTopicsContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      hover: false,
      alreadyClicked: false,
      votes: this.props.votes,
      toggle: false,
    }
    this.props.socket.on('deleteTopic', (deletedTopicId) => {
      this.props.deleteTopicAction(deletedTopicId);
    });
    // this.props.socket.on('newComment', (newCommentObj) => {
    //   console.log('incoming.. 1');
    //   this.props.addCommentAction(newCommentObj);
    // })
  }

  onReturn(){
    this.props.toggleFilter('');
    this.setState({
      toggle: false
    })
  }

  handleClick(id, e) {
    if(this.props.currentFilter !== "ResolvedQuestions"){
      this.props.toggleFilter("ResolvedQuestions");
      this.setState({
        toggle: true
      })
    } else {
      this.props.toggleFilter('');
      this.setState({
        toggle: false
      })
    }
  }

  render() {
    var numOfTopics = this.props.topics.length;
    var numOfQuestions = this.props.questions.length;
    return (
      <div className="topics-container">
        <div style={{display:'flex', 'flexDirection': 'column'}}>
          <div style={{display: 'flex', 'alignItems': 'center', 'justifyContent': 'space-between', 'height':30}}>
            <div className='topics-title'> {numOfTopics + (numOfTopics<=1? ' Topic' : ' Topics')} , {numOfQuestions + (numOfQuestions<2 ? ' Question in Total' : ' Questions in Total')}</div>
            {this.props.currentFilter==='' ? null : <div><i id='return-button' className="material-icons" onClick={()=>{this.onReturn()}}>keyboard_return</i></div>}
          </div>
          <div style={{'maxWidth': 250, 'margin': 16}}>
            <Toggle
              toggled={this.state.toggle}
              label="Resolved questions"
              thumbSwitchedStyle={{backgroundColor: '#00C993'}}
              trackSwitchedStyle={{backgroundColor: '#D9FFF5'}}
              onToggle={(e)=>{this.handleClick(e)}}
              iconStyle={{'marginLeft':-40}}
              style={{'marginTop': 10}}
              labelStyle={{'color':'gray'}}
            />
          </div>
        </div>

        {/* <AddTopic /> */}
        {this.props.topics.map((topic, i) => {
          return(
            <StudentTopic
              text={topic.text}
              votes={topic.votes}
              id={topic._id}
              firstname={topic.firstname}
              lastname={topic.lastname}
              key={i}
              reference={topic.referenceClass}
              topicCreator={topic.username}
              hightlight={this.props.currentFilter===topic.text ? true : false}
              greyOut={this.props.currentFilter!=='' && this.props.currentFilter!==topic.text}
              isDefault={topic.isDefault}
              slideNumber={topic.slideNumber}
              color={topic.color}
              email={topic.email}
            />
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("In the map state to props:", state.classReducer);
  return {
    socket: state.socketReducer.socket,
    classObj: state.classReducer,
    topics: state.classReducer.topics,
    currentFilter: state.filterReducer,
    questions: state.classReducer.questions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteTopicAction: (topicID) => {
      dispatch(deleteTopic(topicID));
    },
    addCommentAction: (newQuestionObject) => {
      dispatch(addComment(newQuestionObject))
    },
    toggleFilter: (newFilter) => {
      dispatch(updateFilter(newFilter))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentTopicsContainer)
