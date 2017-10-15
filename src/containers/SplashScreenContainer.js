import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loading, notLoading} from "../actions/Actions"



class SplashScreenContainer extends Component {
  constructor(props){
    super(props)
  }

  //here we can put our handleclick functions and so on...

  render() {
    return(
      <div>
        <div className="splash-header">
          <text className="splash-header-name">Classly</text>
          <div className="dashboard-navbar">
            <span className="navbar-signup">Sign Up</span>
            <span className="navbar-login">Login</span>
          </div>
        </div>
        <div className="spashCont">
          <div className="splashImageContainer">
            <div className="splashText">
              <div className="splashText-title">Classly </div>
              <div className="splashText-main">
                A live Q&A and <br/>discussion forum for <br/>the future classroom
              </div>
              <div className="splashText-sub">
                Beta testing in progress now!
                <br/>
                Sign up for your class right now.
              </div>
              <div className="navbar-signup-2">Sign Up</div>
            </div>
            <span className="splashImage">
                <img className="demoImage" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/c_scale,w_700/v1508040858/Macbook-PNG-Picture_sueqhy.png"}></img>
            </span>
          </div>
        </div>
        <div className="splash-page2-container">
          <div className="splash-page2-container-green-filter">
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{

  }
}

const mapDispatchToProps = dispatch => {
  return{

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreenContainer);
