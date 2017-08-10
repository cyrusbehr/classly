import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addTopic } from '../actions/Actions'
import ReactTooltip from 'react-tooltip';

class AddTopic extends Component{
  constructor(props) {
    super(props)
    this.state = {
      topicText: "",
      topicEmpty: true,
      slideNumberText: null
    }

    this.props.socket.on('newTopic', (savedTopic) => {
      this.props.addTopicAction(savedTopic);
    })
  }

  updateTopic(e) {
    this.setState({topicText: e.target.value})
    this.setState({topicEmpty: true});
  }

  updateSlideNumber(e) {
    this.setState({slideNumberText: e.target.value});
  }

  submitPressed(e) {
    e.preventDefault();
    if(this.state.topicText.trim() === ''){
      this.setState({topicEmpty: false});
    } else {

      const data = {
        text: this.state.topicText,
        votes: 0,
        timestamp: Date.now(),
        referenceClass: this.props.classObj._id,
        username: this.props.username,
        slideNumber: this.state.slideNumberText

      }
      this.props.socket.emit('newTopic', data);
      this.setState(
        {
          topicText: "",
          slideNumberText: null,
        }
      );
    }
  }

  render() {
    return (
      <div div className="new-topic-container">
        <input
          id= {this.state.topicEmpty ? "new-topic" : "empty-new-topic"}
          value={this.state.topicText}
          type="text"
          onChange={(e) => this.updateTopic(e)}
          placeholder="New Topic..."
        />
        {this.state.topicEmpty ?
          <div className="new-topic-footer">
            <input className="input-slides"
              value={this.state.slideNumberText}
              type="text"
              onChange={(e) => this.updateSlideNumber(e)}
              placeholder="Slide Number (optional)"
            />
            <div className="new-topic-container-container">
              <button data-tip="topic-help" data-for="topic-help" id="topic-help">?</button>
              <button id="submit-topic" onClick={(e) => this.submitPressed(e)}>Submit</button>
            </div>
          </div> :
          <div className="empty-new-topic-footer">
            <input className="input-slides"
              value={this.state.slideNumberText}
              type="text"
              onChange={(e) => this.updateSlideNumber(e)}
              placeholder="Slide Number (optional)"
            />
            <div className="new-topic-container-container">
              <button data-tip="topic-help" data-for="topic-help"
                data-multiline="true" id="topic-help">?</button>
                <button id="submit-topic" onClick={(e) => this.submitPressed(e)}>Submit</button>
              </div>
            </div>
          }
          <ReactTooltip id='topic-help' type='info'>
            <span>Here you can add topics which you would like the professor <br></br>  to revisit. Fellow peers can vote on these topics</span>
          </ReactTooltip>
          {this.state.topicEmpty ? null :
            <div className="empty-new-topic-alert">
              Topic can't be empty!
            </div>
          }
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return{
      socket: state.socketReducer.socket,
      classObj: state.classReducer.classState,
      username: state.userReducer.username,
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      addTopicAction: (savedTopic) => {
        dispatch(addTopic(savedTopic))
      }
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddTopic);
