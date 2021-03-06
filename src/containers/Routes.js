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
import DashboardContainer from './DashboardContainer'
import ProfessorMainRegisterContainer from './ProfessorMainRegisterContainer'
import TAMainRegisterContainer from './TAMainRegisterContainer'
import DashboardClassContainer from './DashboardClassContainer'
import AboutUs from '../components/AboutUs'
import SplashScreenContainer from './SplashScreenContainer'

export default class Routes extends Component {
   render() {
      return(
       <div>
         <Switch>
           <Route path="/dashboard" exact={true} component={DashboardContainer}/>
           <Route path="/student/register" exact={true} component={StudentMainRegisterContainer}/>
           <Route path="/student/signup" exact={true} component={StudentMainPageContainer}/>
           <Route path="/professor/signup" exact={true} component={ProfessorMainPageContainer}/>
           <Route path="/professor/register" exact={true} component={ProfessorMainRegisterContainer}/>
           <Route path="/ta/main" exact={true} component={TAMainViewContainer}/>
           <Route path="/ta/signup" exact={true} component={TAMainPageContainer}/>
           <Route path="/ta/register" exact={true} component={TAMainRegisterContainer}/>
           <Route path="/professor/main" exact={true} component={ProfessorMainViewContainer}/>
           <Route path="/student/main" exact={true} component={StudentMainViewContainer}/>
           <Route path="/main" exact={true} component={MainPageContainer}/>
           <Route path="/" exact={true} component={SplashScreenContainer}/>
           <Route path="/dashboard/class/:coursereference" component={DashboardClassContainer}/>
         </Switch>
       </div>
     )
   }
}
