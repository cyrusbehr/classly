import React, {Component} from 'react';
import { connect } from 'react-redux';
import StudentDashboardCard from './StudentDashboardCard';

class DashboardBodyContainer extends Component {
  constructor(props){
    super(props)
  }

  //TODO: Axios get request for user classes


  render() {
    return(
      <div className="dashboardBody-container">
        <div className="dashboardBody-container-header">
          <h1>Dashboard</h1>
          <button className="dashboardBody-button">Add another class</button>
        </div>
        <div className="dashboardBody-container-body">
          <StudentDashboardCard/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardBodyContainer);
