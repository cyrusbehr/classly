import React, {Component} from 'react';
import ProfessorSignupCard from '../../components/ProfessorSignupCard';
import {ProfessorSignupData} from '../../constants/const';

export default class ProfessorSignupContainer extends Component {
  render() {
    return(
      <div className="student-signup-cards-container">
      <div className="middle-professor-cards-container">
        <div className="professor-signup-slogan-container">
          <div className="professor-signup-slogan">
        Welcome to class.ly,<br></br><text className="professor-word">professor</text>! Let's help you<br></br>get started!
      </div>
      </div>
        <ProfessorSignupCard
          URL={ProfessorSignupData.URL}
          title={ProfessorSignupData.title}
          redirectRoute={ProfessorSignupData.redirectRoute}
          {...this.props}
          />
      </div>
    </div>
    )
  }
};
