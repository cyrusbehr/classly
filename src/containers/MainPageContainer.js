import React, {Component} from 'react'
import LoginCard from '../components/LoginCard'
import {LoginCardData} from '../constants/const'
import StudentSignupContainer from './StudentSubContainers/StudentSignupContainer';
import ProfessorSignupContainer from './ProfessorSubContainers/ProfessorSignupContainer';
import LoginContainer from './LoginContainer';
import { connect } from 'react-redux';

class MainPageContainer extends Component {
  clearUserType() {

    this.props.setUserTypeAction("");
  }
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
              <a href="/" className="name" onClick={() => this.clearUserType()}>Class.ly</a>
          </div>
          <div className="right-nav-bar">
            <div className="home-nav-bar-container">
                <a href="/" className="home-nav-bar" onClick={() => this.clearUserType()}>HOME</a>
            </div>
            <div className="about-nav-bar-container">
                <a href="#" className="about-nav-bar">ABOUT</a>
            </div>
            <div className="contact-nav-bar-container">
                <a href="#" className="contact-nav-bar">CONTACT</a>
            </div>
          </div>
        </div>
        {this.props.userType === 'Student' ? <StudentSignupContainer {...this.props} /> : this.props.userType === 'Professor' ? <ProfessorSignupContainer {...this.props}/> : <LoginContainer {...this.props}/>}
        <div className="footer">
          <div className="copyright-container">
            © 2017 Class.ly
          </div>
          <div className="social-media-container">
            Social Media
          </div>
          <div className="privacy-policy-container">
            <div className="privacy-policy">
              <a ref="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return{
    userType: state.userReducer.userType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserTypeAction: (userType) => {
      dispatch(setUserType(userType))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPageContainer);
