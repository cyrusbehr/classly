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
    <div className="splashImageContainer">
      <span>Paragraph text will go in this segment</span>
      <span>Background image will go here</span>
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
