import React, {Component} from 'react'
import LoginCard from '../components/LoginCard'
import {LoginCardData} from '../constants/const'

export default class LoginContainer extends Component {
  render() {
    console.log('render Login Container');
    return(
      <div>
        {LoginCardData.map((element, index) => {
          return (<LoginCard key={index} URL={element.URL} thisClass={element.thisClass}
          title={element.title} redirectRoute={element.redirectRoute} {...this.props} />)
        })}
      </div>
    )
  }
};
