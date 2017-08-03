import React, { Component } from 'react';

export default class StudentTopic extends Component {
  render() {
    return (
      <div className="topic">
        <div className="topic-content">
          <div className="topic-title">Introduction to HTML</div>
          <div className="topic-description">Powerpoint slides p.1-10</div>
        </div>
        <div className="topic-alert">
          <div className="topic-alert-icon"><button id="alert">!</button></div>
          <div className="topic-alert-number">10</div>
        </div>
      </div>
    );
  }
}
