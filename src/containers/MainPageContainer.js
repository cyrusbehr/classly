import React, {Component} from 'react'
import LoginCard from '../components/LoginCard'
import {LoginCardData} from '../constants/const'
import LoginContainer from './LoginContainer';
import { connect } from 'react-redux';
import {setUser} from '../actions/Actions'
import axios from 'axios'
import {baseDomain} from '../constants/const'
import Modal from 'react-modal';


class MainPageContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      showModalState: false
    }
  }

  clearUserTypeAndRedirect(e) {
    e.preventDefault();
    this.props.history.push('/');
  }

  showModal(){
    this.setState({showModalState: true})
    console.log("you pressed the modal button");
  }

  closeModal() {
    this.setState({showModalState:false})
  }

  componentDidMount() {
    var self = this;
    axios.get(baseDomain + 'checkLogin')
    .then((r) => {
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
              <button className="name" onClick={(e) => this.clearUserTypeAndRedirect(e)}>Classly</button>
          </div>
          <div className="right-nav-bar">
            <div className="home-nav-bar-container">
                <button className="home-nav-bar" onClick={(e) => this.clearUserTypeAndRedirect(e)}>HOME</button>
            </div>
            <div className="about-nav-bar-container">
                <button className="about-nav-bar" onClick={() => this.showModal()}>DEMO ACCOUNT</button>
            </div>
            <div className="contact-nav-bar-container">
                <button className="contact-nav-bar">CONTACT</button>
            </div>
          </div>
        </div>
        <Modal
        className="guide-modal-create-class"
        overlayClassName="guide-modal-overlay"
        isOpen={this.state.showModalState}
        contentLabel="Demo Account"
        >
          <div className="modal-header">
            <text>Demo Account</text>
          </div>
          <div className="text sample-login-information">
            To demo the product as a student, please login with the following credentials:
            <br/>
            <br/>
            Username: s@gmail.com
            <br/>
            Password: test
          </div>
          <div className="modal-footer">
            <button className="dashboardBody-close-button hvr-grow"
              onClick={() => this.closeModal()}
              >Close</button>
          </div>
        </Modal>
        <LoginContainer {...this.props}/>
        <div className="footer">
          <div className="copyright-container">
            © 2021 Classly
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
