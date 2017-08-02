import React, {Component} from 'react'
import LoginCard from '../components/LoginCard'
import {LoginCardData} from '../constants/const'

export default class LoginContainer extends Component {
  render() {
    return(
      <div>
        {LoginCardData.map((element, index) => {
          <div>test</div>
        })}
      </div>
    )
  }
};
