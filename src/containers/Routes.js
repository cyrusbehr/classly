import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import LoginContainer from './LoginContainer'
import MainViewContainer from './MainViewContainer'
import ProfessorSignupContainer from './ProfessorSignupContainer'
import StudentSignupContainer from './StudentSignupContainer'

export default class Routes extends Component {

   render() {
     return(
       <Switch>
         <Route path="/" exact={true} component={LoginContainer}/>
       </Switch>
     )
   }
}
