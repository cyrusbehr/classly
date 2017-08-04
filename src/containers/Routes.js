import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginContainer from './LoginContainer';
import StudentMainViewContainer from './StudentSubContainers/StudentMainViewContainer';
import ProfessorMainViewContainer from './ProfessorSubContainers/ProfessorMainViewContainer';
import ProfessorSignupContainer from './ProfessorSubContainers/ProfessorSignupContainer';
import StudentSignupContainer from './StudentSubContainers/StudentSignupContainer';
import TASignupContainer from './TASignupContainer';
import {connect} from 'react-redux'

export default class Routes extends Component {

  render() {
    console.log('dank')
    return(
      <div>
          <Route path="/student/signup" exact={true} component={StudentSignupContainer}/>
          <Route path="/professor/signup" exact={true} component={ProfessorSignupContainer}/>
          <Route path="/TA/signup" exact={true} component={TASignupContainer}/>
          <Route path="/professor/main" exact={true} component={ProfessorMainViewContainer}/>
          <Route path="/student/main" exact={true} component={StudentMainViewContainer}/>
          <Route path="/" exact={true} component={LoginContainer}/>
      </div>
    )
  }
}
