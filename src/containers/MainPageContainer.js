import React, {Component} from 'react'
import LoginCard from '../components/LoginCard'
import {LoginCardData} from '../constants/const'
import LoginContainer from './LoginContainer';
import { connect } from 'react-redux';
import {setUser} from '../actions/Actions'
import axios from 'axios'
import {baseDomain} from '../constants/const'

class MainPageContainer extends Component {
  clearUserTypeAndRedirect(e) {
    e.preventDefault();
    this.props.history.push('/');
  }

  componentDidMount() {
    var self = this;
    axios.get(baseDomain + 'checkLogin')
    .then((r) => {
      console.log("the response is: ", r.data);
      if(r.data.loggedIn) {
        self.props.setUserAction(r.data.user);
        self.props.history.push('/dashboard')
      }
    })
  }

  render() {
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
        <LoginContainer {...this.props}/>
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
    setUserAction: (user) => {
      dispatch(setUser(user))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPageContainer);
