import React, {Component} from 'react'
import LoginCard from '../components/LoginCard'
import {LoginCardData} from '../constants/const'

export default class LoginContainer extends Component {
  render() {
    console.log('render Login Container');
    return(
      <div className="login-container">
      <div className="background-picture">
      </div>
      <div className="background-overlay">
      </div>
      <div className="top-nav-bar">
        <div className="name-container">
          <div className="name">
            Class.ly
          </div>
        </div>
        <div className="right-nav-bar">
          <div className="home-nav-bar-container">
            <div className="home-nav-bar">
              HOME
            </div>
          </div>
          <div className="about-nav-bar-container">
            <div className="about-nav-bar">
              ABOUT
            </div>
          </div>
          <div className="contact-nav-bar-container">
            <div className="contact-nav-bar">
              CONTACT
            </div>
          </div>
        </div>
      </div>
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
      <div className="footer">
        <div className="copyright-container">
          © 2017 Class.ly
        </div>
        <div className="social-media-container">
          Social Media
        </div>
        <div className="privacy-policy-container">
          <div className="privacy-policy">
            Pirvacy Policy
          </div>
        </div>
      </div>
      </div>
    )
  }
};
