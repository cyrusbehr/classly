 import React, { Component } from 'react'
import LoginCard from '../components/LoginCard'
import { LoginCardData } from '../constants/const'

export default class LoginContainer extends Component {
  render() {
    return(
      <div className="main-login-cards-container">
        <div className="middle-login-cards-container">
          <div className="login-slogan-container">
            <div className="login-slogan">
              Let's get you set up with
              <text className="classroom-word">Class.ly</text>
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
