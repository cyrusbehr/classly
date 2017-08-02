import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginContainer from './LoginContainer';
import MainViewContainer from './MainViewContainer';
import ProfessorSignupContainer from './ProfessorSignupContainer';
import StudentSignupContainer from './StudentSignupContainer';
import TASignupContainer from './TASignupContainer';

export default class Routes extends Component {

   render() {
     return(
       <Switch>
         <Route path="/" exact={true} component={LoginContainer}/>
         <Route path="/student/signup" exact={true} component={StudentSignupContainer}/>
         <Route path="/professor/signup" exact={true} component={ProfessorSignupContainer}/>
         <Route path="/TA/signup" exact={true} component={TASignupContainer}/>
         <Route path="/main" exact={true} componenet={MainViewContainer}/>
       </Switch>
     )
   }
}
