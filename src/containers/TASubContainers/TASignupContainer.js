import React, {Component} from 'react';
import TASignupCard from '../../components/TASignupCard'
import {taSignupData} from '../../constants/const'

export default class StudentSignupContainer extends Component {
  render() {
    return(
      <div className="student-signup-cards-container">
      <div className="middle-student-cards-container">
        <div className="student-signup-slogan-container">
          <div className="student-signup-slogan">
        Welcome to class.ly,<br></br><text className="student-word">TA</text>! Let's help you<br></br>get started!
      </div>
      </div>
        <TASignupCard
          URL={taSignupData.URL}
          title={taSignupData.title}
          redirectRoute={taSignupData.redirectRoute}
          {...this.props}
        />
      </div>
    </div>
    )
  }
};
