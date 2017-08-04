import React, { Component } from 'react';

export default class StudentNewTopic extends Component {
  render() {
    console.log('Autocomplete', Autocomplete);
    return (
      <div className="new-topic-container">
        <input id="new-topic" type="text" placeholder="New Topic..." />

        <div className="new-topic-footer">
          <button id="topic-help">?</button>
          <button id="submit-topic">Submit</button>
        </div>
      </div>
    );
  }
}
