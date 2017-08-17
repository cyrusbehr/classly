import React, { Component } from 'react';
// import StudentNewTopic from '../../components/StudentNewTopic';
import StudentTopic from '../../components/StudentTopic';
// import AddTopic from '../../components/AddTopic';
import { connect } from 'react-redux'
import { deleteTopic, updateFilter } from '../../actions/Actions';


class ProfessorTopicsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.props.socket.on('deleteTopic', (deletedTopicId) => {
      this.props.deleteTopicAction(deletedTopicId);
    });
  }


  onReturn(){
    this.props.toggleFilter('');
  }

  handleClick(id, e) {
    if(this.props.currentFilter !== "ResolvedQuestions"){
      this.props.toggleFilter("ResolvedQuestions");
    } else {
      this.props.toggleFilter('');
    }
  }

  render() {
    // console.log("class object" ,this.props.classObj);
    // var proffArr = this.props.classObj.professorName.split(" ")
    // var profname = proffArr[1] || proffArr[0];
    console.log("topics", this.props.topics);
    console.log("questions", this.props.questions);
    var numOfTopics = this.props.classObj.topics.length;
    var numOfQuestions = this.props.classObj.questions.length;
    return (
      <div className="topics-container">
        <div style={{display:'flex', 'justifyContent': 'space-between', 'alignItems':'center'}}>
          <p className='topics-title'> {numOfTopics + (numOfTopics<=1? ' Topic' : ' Topics')} , {numOfQuestions + (numOfQuestions<2 ? ' Question in Total' : ' Questions in Total')}</p>
          {this.props.currentFilter==='' ? null : <i id='return-button' className="material-icons" onClick={()=>{this.onReturn()}}>keyboard_return</i>}
          <button id='resolved-questions-button' className="resolved-questions-button" onClick={(e)=>{this.handleClick(e)}}>See Resolved Questions</button>
        </div>
        {/* <div className="topics-container-header">
          <span className="course">MECH 101</span>

        <div className="topics-container-header">
          <span className="course">{this.props.classObj.className}</span>

          <span className="lecturer">Prof {profname}</span>
        </div> */}
        {/* <AddTopic /> */}
        {this.props.topics.map((topic, i) => {
          return(
            <StudentTopic
              text={topic.text}
              votes={topic.votes}
              id={topic._id}
              key={i}
              email={topic.email}
              reference={topic.referenceClass}
              topicCreator={topic.username}
              hightlight={this.props.currentFilter===topic.text ? true : false}
              greyOut={this.props.currentFilter!=='' && this.props.currentFilter!==topic.text}
              isDefault={topic.isDefault}
              color={topic.color}
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
    classObj: state.classReducer,
    topics: state.classReducer.topics,
    questions: state.classReducer.questions,
    currentFilter: state.filterReducer,
    socket: state.socketReducer.socket,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteTopicAction: (topicID) => {
      dispatch(deleteTopic(topicID));
    },
    toggleFilter: (newFilter) => {
      dispatch(updateFilter(newFilter))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessorTopicsContainer)
