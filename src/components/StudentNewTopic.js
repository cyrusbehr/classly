import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

export default class StudentNewTopic extends Component {
  render() {
    console.log('Autocomplete', Autocomplete);
    return (
      <div className="new-topic-container">
        <input id="new-topic" type="text" placeholder="New Topic..." />
        <div className="new-topic-footer">
          <button data-tip="topic-help" data-for="topic-help" id="topic-help">?</button>
          <button id="submit-topic">Submit</button>
        </div>
        <ReactTooltip id='topic-help' type='success'>
          <span>Mark as resolved</span>
        </ReactTooltip>
      </div>
    );
  }
}
