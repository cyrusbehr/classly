import React, { Component } from 'react';
import { StudentNewTopic } from '../../components/StudentNewTopic';
import { StudentTopic } from '../../components/StudentTopic';

export default class StudentTopicsContainer extends Component {
  render() {
    return (
      <div>
        <h1>This is StudentTopicsContainer</h1>
        <StudentNewTopic />
        <StudentTopic />
      </div>
    );
  }
}
