import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { setUserType } from '../actions/Actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class LoginCard extends Component {
  constructor(props) {
    super(props)
  }

  redirect() {
    this.props.setUserTypeAction(this.props.title)
    this.props.history.push(this.props.redirectRoute);
  }

  render() {
    // if (this.state.shouldRedirect) {
    //   return <Redirect to={this.props.redirectRoute}/>;
    // }
    return(
      <div className="login-card" onClick={() => this.redirect()}>
        <div className={this.props.thisClass}>
          <img src={this.props.URL} className="login-card-picture"/>
          {/* <br/>
          imageURL: {this.props.URL}
          <br/>
          title: {this.props.title}
          <br/>
          redirect route: {this.props.redirectRoute}
          <br/>
          componentClassName: {this.props.thisClass} */}
          <div className="card-title">
            {this.props.title}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserTypeAction: (userType) => {
      dispatch(setUserType(userType))
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginCard);
