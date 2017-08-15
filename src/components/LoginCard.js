import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class LoginCard extends Component {
  constructor(props) {
    super(props)
  }

  redirect() {
    this.props.history.push(this.props.redirectRoute);
  }

  render() {
    return(
      <div className="login-card" onClick={() => this.redirect()}>
        <div className={this.props.thisClass}>
          <img src={this.props.URL} className="login-card-picture"/>
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginCard);
