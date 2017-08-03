import React, { Component } from 'react';
// import StudentNewTopic from '../../components/StudentNewTopic';
import AddTopic from '../../components/StudentTopic';
import StudentTopic from '../../components/AddTopic';

export default class StudentTopicsContainer extends Component {
  render() {
    return (
      <div className="topics-container">
        <div className="topics-container-header">
          <span className="course">CS 101</span>
          <span className="lecturer">Prof Behroozi</span>
        </div>
        <AddTopic />
        <StudentTopic />
      </div>
    );
  }
}
