import React, { Component } from 'react';
import { StudentNewTopic } from '../componenets/StudentNewTopic';
import { StudentTopic } from '../componenets/StudentTopic';

export default class StudentTopicsContainer extends Component {

render() {
  return (
    <div className="topics-container">

      <div className="topics-container-header">
        <span className="course">CS 101</span>
        <span className="lecturer">Prof Behroozi</span>
      </div>

      <StudentNewTopic />

      <StudentTopic />

    </div>
  );
}
}
