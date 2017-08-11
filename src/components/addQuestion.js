import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addQuestion, addTopic } from '../actions/Actions';
import Autocomplete from 'react-autocomplete';
import { matchStateToTerm } from 'react-autocomplete';
import $ from 'jquery';
import ReactTooltip from 'react-tooltip'
import { isUnique } from '../constants/algorithmicos'

import {randomColor} from '../constants/algorithmicos';
import {colorArray} from '../constants/const';

class AddQuestion extends Component{
  constructor(props) {
    super(props)
    this.state = {
      questionText: "",
      tags: "",
      questionEmpty: true
    }

    this.props.socket.on('newQuestion', (savedQuestion) => {
      this.props.addQuestionAction(savedQuestion);
    })

    this.props.socket.on('newTopic', (savedTopic) => {
      this.props.addTopicAction(savedTopic);
      console.log('This was hit')
    })
  }

  componentDidMount() {
    let self = this;
    $("input").on('keyup', function (e) {
      if (e.keyCode == 13) {
        self.submitPressed(e)
      }
    });
  }

  updateTags(e) {
    this.setState({tags: e.target.value})
  }

  updateQuestion(e) {
    this.setState({questionText: e.target.value})
    this.setState({questionEmpty: true})
  }

  submitPressed(e) {
    e.preventDefault();

    if(this.state.questionText.trim() === ''){
      this.setState({questionEmpty: false});
    } else {

      var isUniqueTopic = isUnique(this.state.tags, this.props.topicsArr);

      const data = {
        text: this.state.questionText,
        username: this.props.username,
        userType: this.props.userType,
        tags: this.state.tags,
        referenceClass: this.props.classObj._id,
        isResolved: false,
        isStarred: false,
        upVotes: 0,
        timestamp: Date.now(),
        isUniqueTopic,
        color: randomColor(colorArray)
      }

      console.log("this is data in addQuestions:", data);
      this.props.socket.emit('newQuestion', data);
      this.setState({
        questionText: "",
        // tags: ""
      })

      // BOOKMARK
      // $('.questions-container').animate({
      //   scrollTop: $('.questions-container').height()
      // },
      // 500,
      // "swing");
      $('.questions-container').animate({
        scrollTop: $('#anchor').offset().top
      }, 500, "swing");
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      tags: nextProps.currentFilter,
    })
  }
  render() {
    return (
      <div className="new-question-container">
        <div className="new-question-input-field">
          <input
            id={this.state.questionEmpty ? "new-question" : "empty-new-question"}
            value={this.state.questionText}
            type="text"
            onChange={(e) => this.updateQuestion(e)}
            placeholder="New Question..."
          />

          <Autocomplete
            wrapperProps={{id:'new-tag'}}
            inputProps={{id:'tag', placeholder:'#topic'}}
            getItemValue={(item) => item.text}
            items={this.props.classObj.topics}
            renderItem={(item, isHighlighted) =>
              <div id="menu-item" style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.text}
              </div>
            }
            value={this.state.tags}
            onChange={(e) => this.updateTags(e)}
            onSelect={(val) => this.setState({tags:val})}
            shouldItemRender={ (item, val)=>{
              return item.text.toLowerCase().indexOf(val.toLowerCase()) !== -1
            }}
          />

        </div>

        {this.state.questionEmpty ?
          <div className="new-question-footer">
            <button data-tip="question-help" data-for="question-help" id="question-help">?</button>
            <button id="submit-question" onClick={(e) => this.submitPressed(e)}>Submit</button>
          </div> :
          <div className="empty-new-question-footer">
            <div className="empty-new-question-alert">
              Question can't be empty!
            </div>
            <div className="empty-new-question-container">
              <button data-tip="question-help" data-for="question-help" id="question-help">?</button>
              <button id="submit-question" onClick={(e) => this.submitPressed(e)}>Submit</button>
            </div>
          </div>
        }
        <ReactTooltip id='question-help' type='info'>
          <span>Here you can ask any questions you have. <br/>You can add optional topic tags, <br/>and vote on other questions</span>
        </ReactTooltip>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    socket: state.socketReducer.socket,
    username: state.userReducer.username,
    classObj: state.classReducer.classState,
    currentFilter: state.filterReducer,
    userType: state.userReducer.userType,
    topicsArr: state.classReducer.classState.topics,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addQuestionAction: (newQuestion) => {
      dispatch(addQuestion(newQuestion))
    },
    addTopicAction: (savedTopic) => {
      dispatch(addTopic(savedTopic))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddQuestion);
