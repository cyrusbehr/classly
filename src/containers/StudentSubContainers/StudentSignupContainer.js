import React, {Component} from 'react';
import StudentSignupCard from '../../components/StudentSignupCard'
import {StudentSignupData} from '../../constants/const'

export default class StudentSignupContainer extends Component {
  render() {
    return(
      <div className="student-signup-cards-container">
      <div className="middle-student-cards-container">
        <div className="student-signup-slogan-container">
          <div className="student-signup-slogan">
        Welcome to class.ly,<br></br><text className="student-word">student</text>! Let's help you<br></br>get started!
      </div>
      </div>
        <StudentSignupCard
          URL={StudentSignupData.URL}
          title={StudentSignupData.title}
          redirectRoute={StudentSignupData.redirectRoute}
          {...this.props}
        />
      </div>
    </div>
    )
  }
};
