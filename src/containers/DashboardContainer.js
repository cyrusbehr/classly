import React, {Component} from 'react';
import { connect } from 'react-redux';
import DashboardBodyContainer from './DashboardBodyContainer';

class DashboardContainer extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div className="dashboard">
        <div className="dashboard-header">
          <text className="dashboard-header-name">Class.ly</text>
          <div className="dashboard-header-nav-bar">
            <img src="../assets/alert.png"/>
            <span>Icon</span>
          </div>
        </div>
        <DashboardBodyContainer/>
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
)(DashboardContainer);
