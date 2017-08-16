import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import MainPageContainer from './MainPageContainer';
import StudentMainViewContainer from './StudentSubContainers/StudentMainViewContainer';
import ProfessorMainViewContainer from './ProfessorSubContainers/ProfessorMainViewContainer';
import TAMainViewContainer from './TASubContainers/TAMainViewContainer';
import {connect} from 'react-redux'
import ProfessorMainPageContainer from './ProfessorMainPageContainer'
import StudentMainPageContainer from './StudentMainPageContainer'
import TAMainPageContainer from './TAMainPageContainer'
import StudentMainRegisterContainer from './StudentMainRegisterContainer'
import StudentDashboardContainer from './StudentDashboardContainer'
import StudentDashboardCard from './StudentDashboardCard'
import ProfessorMainRegisterContainer from './ProfessorMainRegisterContainer'
import TAMainRegisterContainer from './TAMainRegisterContainer'



export default class Routes extends Component {

   render() {
      return(
       <div>
         <Switch>
          <Route path="/student/dashboard" exact={true} component={StudentDashboardContainer}/>
           <Route path="/student/register" exact={true} component={StudentMainRegisterContainer}/>
           <Route path="/student/signup" exact={true} component={StudentMainPageContainer}/>
           <Route path="/professor/signup" exact={true} component={ProfessorMainPageContainer}/>
           <Route path="/professor/register" exact={true} component={ProfessorMainRegisterContainer}/>
           <Route path="/ta/main" exact={true} component={TAMainViewContainer}/>
           <Route path="/ta/signup" exact={true} component={TAMainPageContainer}/>
           <Route path="/ta/register" exact={true} component={TAMainRegisterContainer}/>
           <Route path="/professor/main" exact={true} component={ProfessorMainViewContainer}/>
           <Route path="/student/main" exact={true} component={StudentMainViewContainer}/>
           <Route path="/" exact={true} component={MainPageContainer}/>
         </Switch>
       </div>
     )
   }

}
