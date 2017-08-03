import React, {Component} from 'react'

export default class StudentQuestion extends Component {

  render() {
    return (
      <div className="question">
        <div className="question-body">
          <div className="question-header">Tags: <span className="tag">Introduction to HTML</span></div>
          <div className="question-body"> How do I do inline styling for my HTML? </div>
          <div className="question-footer"></div>
        </div>
        <div className="question-upvote-container">
          <div className="upvote-icon-container">
            <svg width="38px" height="24px" viewBox="0 0 38 24" version="1.1">
              <polygon id="upvote-icon" points="19 -8.8817842e-16 0 18.8571429 4.43333333 23.2571429 19 8.8 33.5666667 23.2571429 38 18.8571429"></polygon>
            </svg>
          </div>
          <div className="upvote-number">12</div>
        </div>
      </div>
    );
  }
}
