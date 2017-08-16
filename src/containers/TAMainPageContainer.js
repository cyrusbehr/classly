import React, {Component} from 'react'
import LoginCard from '../components/LoginCard'
import {LoginCardData} from '../constants/const'
import TASignupContainer from './TASubContainers/TASignupContainer';
import { connect } from 'react-redux';

class TAMainPageContainer extends Component {
  clearUserTypeAndRedirect(e) {
    e.preventDefault();
    this.props.history.push('/');
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
              <button className="name" onClick={(e) => this.clearUserTypeAndRedirect(e)}>Class.ly</button>
          </div>
          <div className="right-nav-bar">
            <div className="home-nav-bar-container">
                <button className="home-nav-bar" onClick={(e) => this.clearUserTypeAndRedirect(e)}>HOME</button>
            </div>
            <div className="about-nav-bar-container">
                <button className="about-nav-bar">ABOUT</button>
            </div>
            <div className="contact-nav-bar-container">
                <button className="contact-nav-bar">CONTACT</button>
            </div>
          </div>
        </div>
        <TASignupContainer {...this.props}/>
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

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TAMainPageContainer);
