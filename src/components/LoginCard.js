import React, {Component} from 'react'

export default class LoginCard extends Component {

  render() {
    return(
      <div>
        <div className={this.props.thisClass}>
          imageURL: {this.props.URL}
          <br/>
          title: {this.props.title}
          <br/>
          redirect route: {this.props.redirectRoute}
          <br/>
          componentClassName (use this to format and place them in the correct place): {this.props.className}
        </div>
      </div>
    )
  }
}
