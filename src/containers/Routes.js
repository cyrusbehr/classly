import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginContainer from './LoginContainer';
import MainViewContainer from './MainViewContainer';
import ProfessorSignupContainer from './ProfessorSignupContainer';
import StudentSignupContainer from './StudentSignupContainer';
import TASignupContainer from './TASignupContainer';

export default class Routes extends Component {

   render() {
     console.log('render Routes component');
      return(
       <div>
           <Switch>
           <Route path="/student/signup" component={StudentSignupContainer}/>
           <Route path="/professor/signup" component={ProfessorSignupContainer}/>
           <Route path="/TA/signup" component={TASignupContainer}/>
           <Route path="/main" component={MainViewContainer}/>
           <Route path="/" exact={true} component={LoginContainer}/>
         </Switch>
       </div>
     )
   }
}
