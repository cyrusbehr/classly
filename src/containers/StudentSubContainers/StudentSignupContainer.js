import React, {Component} from 'react';
import StudentSignupCard from '../../components/StudentSignupCard'

export default class StudentSignupContainer extends Component {
  render() {
    return(
      <div>
        This is the StudentSignupContainer container
        <StudentSignupCard />
      </div>
    )
  }
};
