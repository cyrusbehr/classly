import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class LoginCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldRedirect: false,
    }
  }

  redirect() {
    this.props.history.push(this.props.redirectRoute);
  }

  render() {
    // if (this.state.shouldRedirect) {
    //   return <Redirect to={this.props.redirectRoute}/>;
    // }
    return(
      <div onClick={() => this.redirect()}>
        <div className={this.props.thisClass}>
          <br/>
          imageURL: {this.props.URL}
          <br/>
          title: {this.props.title}
          <br/>
          redirect route: {this.props.redirectRoute}
          <br/>
          componentClassName: {this.props.thisClass}
        </div>
      </div>
    )
  }
}
