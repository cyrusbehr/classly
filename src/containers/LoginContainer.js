import React, {Component} from 'react'
import LoginCard from '../components/LoginCard'
import {LoginCardData} from '../constants/const'
import StudentSignupContainer from './StudentSubContainers/StudentSignupContainer';
import ProfessorSignupContainer from './ProfessorSubContainers/ProfessorSignupContainer';

export default class LoginContainer extends Component {
  render() {
    console.log('render Login Container');
    return(
      <div className="main-login-cards-container">
        <div className="middle-login-cards-container">
          <div className="login-slogan-container">
            <div className="login-slogan">
              With Class.ly, let's <br></br>build the <text className="classroom-word">
                Classroom</text> of<br></br>the <text className="future-word">Future</text>
            </div>
          </div>
          <div className="login-cards-container">
            {LoginCardData.map((element, index) => {
              return (<LoginCard key={index} URL={element.URL} thisClass={element.thisClass}
              title={element.title} redirectRoute={element.redirectRoute} {...this.props} />)
            })}
          </div>
        </div>
      </div>
    )
  }
};
