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
    // update the state here
    this.setState({
      shouldRedirect: true
    });
  }

  render() {
    return(
      <div onClick={() => this.redirect()}>
        {this.state.shouldRedirect ? <Redirect to={this.props.redirectRoute}/> : "" }
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
